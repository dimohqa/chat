import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user/')
export class UserController {
  constructor(private UserService: UserService) {}

  @Get('/get')
  async get(@Param('id') _id: string) {
    return this.UserService.findOne({ _id });
  }
}
