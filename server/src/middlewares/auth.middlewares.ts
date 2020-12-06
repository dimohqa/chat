import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { config } from '../config';
import { UserService } from '../modules/user/user.service';
import { AuthService } from '../modules/auth/auth.service';
import { JwtToken } from '../interfaces/jwtToken';

const { secretKey } = config;

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (
      req.originalUrl === '/auth/login' ||
      req.originalUrl === '/auth/registration'
    ) {
      return next();
    }

    const { token, refreshToken } = req.cookies;

    if (!token || !refreshToken) {
      return res.redirect(403, '/login');
    }

    if (token) {
      const decodedToken = <JwtToken>verify(token, secretKey);

      const user = await this.userService.findOne({ _id: decodedToken.userId });

      if (!user) {
        return res.redirect(403, '/login');
      }

      const foundRefreshToken = await this.authService.findRefreshToken(
        refreshToken,
      );

      if (!foundRefreshToken) {
        return res.redirect(403, '/login');
      }

      if (decodedToken.exp < Date.now() / 1000) {
        const newRefreshToken = await this.authService.updateRefreshToken(
          foundRefreshToken,
        );
        const newJwtToken = await this.authService.generateJwtToken(user.id);

        res.cookie('token', newJwtToken, {
          httpOnly: true,
        });

        res.cookie('refreshToken', newRefreshToken, {
          httpOnly: true,
        });
      }

      return next();
    }

    return res.redirect(403, '/login');
  }
}
