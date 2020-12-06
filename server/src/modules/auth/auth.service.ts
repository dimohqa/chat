import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import {
  RefreshToken,
  RefreshTokenDocument,
} from '../../schemas/refreshToken.schema';
import { randomBytes } from 'crypto';
import { Model } from 'mongoose';
import { sign } from 'jsonwebtoken';
import { config } from '../../config';
import { Request, Response } from 'express';

const { secretKey } = config;

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(RefreshToken.name)
    private RefreshTokenModel: Model<RefreshTokenDocument>,
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
}
