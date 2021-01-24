import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../modules/auth/auth.service';
import { JwtToken } from '../interfaces/jwtToken';
import { verify } from 'jsonwebtoken';
import { UserService } from '../modules/user/user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const { token, refreshToken } = request.cookies;

    if (!token || !refreshToken) {
      return false;
    }

    const foundedRefreshToken = await this.authService.findRefreshToken(
      refreshToken,
    );

    if (!foundedRefreshToken) {
      return false;
    }

    const decodedToken = await (<JwtToken>(
      verify(refreshToken, this.configService.get<string>('SECRET'))
    ));

    if (!decodedToken) {
      return false;
    }

    request.user = await this.userService.getById(decodedToken.userId);

    return true;
  }
}
