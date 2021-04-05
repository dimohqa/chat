import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import {
  RefreshToken,
  RefreshTokenDocument,
} from '../../schemas/refreshToken.schema';
import { Model, Types } from 'mongoose';
import { sign, TokenExpiredError, verify } from 'jsonwebtoken';
import { JwtToken } from '../../interfaces/jwtToken';
import { UserService } from '../user/user.service';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { parse } from 'cookie';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

const cookieOptions = {
  httpOnly: true,
  maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
};

@Injectable()
export class AuthService {
  secretKey: string;

  constructor(
    @InjectModel(RefreshToken.name)
    private readonly refreshTokenModel: Model<RefreshTokenDocument>,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    this.secretKey = this.configService.get<string>('SECRET');
  }

  async authorizeUser(userId: string, response: Response) {
    const token = await this.generateJwtToken(userId);

    const refreshToken = await this.createRefreshToken(userId);

    response.cookie('token', token, cookieOptions);

    response.cookie('refreshToken', refreshToken, cookieOptions);
  }

  async checkCorrectPassword(password, requestPassword) {
    return compare(password, requestPassword);
  }

  generateRefreshToken(userId) {
    return sign({ userId }, this.secretKey, {
      expiresIn: '30d',
    });
  }

  async createRefreshToken(id: string) {
    const token = this.generateRefreshToken(id);

    await new this.refreshTokenModel({
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
    return this.refreshTokenModel.findOne({ token });
  }

  async generateJwtToken(userId: string) {
    return sign({ userId }, this.secretKey, {
      expiresIn: '1h',
    });
  }

  async deleteRefreshToken(user: string, token: string) {
    await this.refreshTokenModel.deleteOne({
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
      verify(refreshToken, this.secretKey)
    ));

    try {
      await (<JwtToken>verify(token, this.secretKey));
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        console.log('expired jwt token');
        client.emit('updateToken');
      } else {
        throw error;
      }
    }

    const user = await this.userService.getById(decodedRefreshToken.userId);

    if (!user) {
      throw new WsException('Ошибка авторизации 4');
    }

    client.request.userId = decodedRefreshToken.userId;
    client.request.refreshToken = refreshToken;
    client.request.token = token;
  }
}
