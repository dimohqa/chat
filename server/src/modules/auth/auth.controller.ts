import {
  Body,
  Controller,
  ForbiddenException,
  Post,
  Redirect,
  Res,
} from "@nestjs/common";
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";
import { Response } from "express";
import { User } from "../../schemas/user.schema";

@Controller("auth")
export class AuthController {
  constructor(
    private UserService: UserService,
    private AuthService: AuthService
  ) {}

  @Post("/registration")
  @Redirect("/")
  async registration(@Body() user: User) {
    await this.UserService.create(user);
  }

  @Post("/login")
  async login(
    @Body("email") email: string,
    @Body("password") password: string,
    @Res({ passthrough: true }) response: Response
  ) {
    const user = await this.UserService.findUserByEmail(email);

    if (!user) {
      throw new ForbiddenException("User was not found");
    }

    const passwordIsCorrect = await this.AuthService.checkCorrectPassword(
      password,
      user.password
    );

    if (!passwordIsCorrect) {
      throw new ForbiddenException("Password is not correct");
    }

    const token = await this.AuthService.generateJwtToken(user.id);

    const refreshToken = await this.AuthService.createRefreshToken(user.id);

    response.cookie("token", token, {
      httpOnly: true,
    });

    response.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });

    return user.id;
  }
}
