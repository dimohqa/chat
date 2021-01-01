import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import {
  RefreshToken,
  RefreshTokenDocument,
} from '../../schemas/refreshToken.schema';
import { randomBytes } from 'crypto';
import { Model } from 'mongoose';
import { sign, verify } from 'jsonwebtoken';
import { config } from '../../config';
import { JwtToken } from '../../interfaces/jwtToken';
import { UserService } from '../user/user.service';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { parse } from 'cookie';

const { secretKey } = config;

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(RefreshToken.name)
    private RefreshTokenModel: Model<RefreshTokenDocument>,
    private UserService: UserService,
  ) {}

  async checkCorrectPassword(password, requestPassword) {
    return compare(password, requestPassword);
  }

  generateRefreshToken() {
    return randomBytes(40).toString('hex');
  }

  async createRefreshToken(id: string) {
    const token = this.generateRefreshToken();

    await new this.RefreshTokenModel({
      user: id,
      token,
      created: new Date(),
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    }).save();

    return token;
  }

  async updateRefreshToken(refreshToken: RefreshTokenDocument) {
    refreshToken.token = this.generateRefreshToken();
    refreshToken.expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await refreshToken.save();

    return refreshToken.token;
  }

  async findRefreshToken(token: string) {
    return this.RefreshTokenModel.findOne({ token });
  }

  async generateJwtToken(userId: string) {
    return sign({ userId }, secretKey, {
      expiresIn: '1h',
    });
  }

  async checkAuthorization(client: Socket) {
    const cookies = parse(client.handshake.headers.cookie || '');

    const { token, refreshToken } = cookies;

    if (!token || !refreshToken) {
      throw new WsException('Ошибка авторизации');
    }

    const decodedToken = <JwtToken>verify(token, secretKey);

    const user = await this.UserService.findOne({ _id: decodedToken.userId });

    if (!user) {
      throw new WsException('Ошибка авторизации');
    }

    const foundRefreshToken = await this.findRefreshToken(refreshToken);

    if (!foundRefreshToken) {
      throw new WsException('Ошибка авторизации');
    }

    if (decodedToken.exp < Date.now() / 1000) {
      client.emit('updateTokens');
      throw new WsException('Ошибка авторизации');
    }

    client.request.userId = decodedToken.userId;
  }
}
