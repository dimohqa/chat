import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtToken } from './interfaces/jwtToken';
import { verify } from 'jsonwebtoken';
import { UserService } from './modules/user/user.service';
import { AuthService } from './modules/auth/auth.service';
import { Reflector } from '@nestjs/core';
import { config } from './config';

const { secretKey } = config;

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    const { token, refreshToken } = context.switchToHttp().getRequest().cookies;

    if (!token || !refreshToken) {
      throw new UnauthorizedException();
    }

    const decodedToken = <JwtToken>verify(token, secretKey);

    const user = await this.userService.findOne({ _id: decodedToken.userId });

    if (!user) {
      throw new UnauthorizedException();
    }

    const foundRefreshToken = await this.authService.findRefreshToken(
      refreshToken,
    );

    if (!foundRefreshToken) {
      throw new UnauthorizedException();
    }

    if (decodedToken.exp < Date.now() / 1000) {
      const newRefreshToken = await this.authService.updateRefreshToken(
        foundRefreshToken,
      );
      const newJwtToken = await this.authService.generateJwtToken(user.id);

      context.switchToHttp().getResponse().cookie('token', newJwtToken, {
        httpOnly: true,
      });

      context
        .switchToHttp()
        .getResponse()
        .cookie('refreshToken', newRefreshToken, {
          httpOnly: true,
        });
    }

    return true;
  }
}
