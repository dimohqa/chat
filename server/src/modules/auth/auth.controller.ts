import {
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  Post,
  Get,
  Res,
  Request,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { User } from '../../schemas/user.schema';
import { Public } from '../../helpers/public.decorator';

const cookieOptions = {
  httpOnly: true,
  maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
};

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Post('/registration')
  async registration(@Body() user: User) {
    await this.userService.create(user);
  }

  @Public()
  @Post('/login')
  @HttpCode(200)
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.userService.findUserByEmail(email);

    if (!user) {
      throw new ForbiddenException('User was not found');
    }

    const passwordIsCorrect = await this.authService.checkCorrectPassword(
      password,
      user.password,
    );

    if (!passwordIsCorrect) {
      throw new ForbiddenException('Password is not correct');
    }

    const token = await this.authService.generateJwtToken(user.id);

    const refreshToken = await this.authService.createRefreshToken(user.id);

    response.cookie('token', token, cookieOptions);

    response.cookie('refreshToken', refreshToken, cookieOptions);

    return { userId: user.id };
  }

  // TODO: тут не определен userId, поэтому создается рандомный jwt без userId. Добавить auth
  @Get('updateToken')
  async updateToken(
    @Request() req: { userId: string },
    @Res() response: Response,
  ) {
    const token = await this.authService.generateJwtToken(req.userId);

    response.cookie('token', token, {
      httpOnly: true,
    });

    return true;
  }
}
