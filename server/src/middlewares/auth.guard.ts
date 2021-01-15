import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../modules/auth/auth.service';
import { JwtToken } from '../interfaces/jwtToken';
import { verify } from 'jsonwebtoken';
import { config } from '../config';

const { secretKey } = config;

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private AuthService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const { token, refreshToken } = request.cookies;

    if (!token || !refreshToken) {
      return false;
    }

    const foundedRefreshToken = await this.AuthService.findRefreshToken(
      refreshToken,
    );

    if (!foundedRefreshToken) {
      return false;
    }

    const decodedToken = await (<JwtToken>verify(refreshToken, secretKey));

    request.userId = decodedToken.userId;

    return true;
  }
}
