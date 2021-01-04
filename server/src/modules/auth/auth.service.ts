import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import {
  RefreshToken,
  RefreshTokenDocument,
} from '../../schemas/refreshToken.schema';
import { Model } from 'mongoose';
import { sign, TokenExpiredError, verify } from 'jsonwebtoken';
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

  generateRefreshToken(userId) {
    return sign({ userId }, secretKey, {
      expiresIn: '30d',
    });
  }

  async createRefreshToken(id: string) {
    const token = this.generateRefreshToken(id);

    await new this.RefreshTokenModel({
      user: id,
      token,
      created: new Date(),
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    }).save();

    return token;
  }

  async updateRefreshToken(refreshToken: RefreshTokenDocument, userId: string) {
    refreshToken.token = this.generateRefreshToken(userId);
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

  async deleteRefreshToken(user: string, token: string) {
    await this.RefreshTokenModel.deleteOne({
      user,
      token,
    });
  }

  async checkAuthorization(client: Socket) {
    const cookies = parse(client.handshake.headers.cookie || '');

    const { token, refreshToken } = cookies;

    if (!token || !refreshToken) {
      throw new WsException('Ошибка авторизации 1');
    }

    const foundRefreshToken = await this.findRefreshToken(refreshToken);

    if (!foundRefreshToken) {
      throw new WsException('Ошибка авторизации 2');
    }

    const decodedRefreshToken = await (<JwtToken>(
      verify(refreshToken, secretKey)
    ));

    try {
      await (<JwtToken>verify(token, secretKey));
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        console.log('expired jwt token');
        client.emit('updateToken');
      } else {
        throw error;
      }
    }

    const user = await this.UserService.findOne({
      _id: decodedRefreshToken.userId,
    });

    if (!user) {
      throw new WsException('Ошибка авторизации 4');
    }

    client.request.userId = decodedRefreshToken.userId;
    client.request.refreshToken = refreshToken;
    client.request.token = token;
  }
}
