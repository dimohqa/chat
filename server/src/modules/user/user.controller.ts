import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user/')
export class UserController {
  constructor(private UserService: UserService) {}

  @Get('/get')
  async get(
    @Query('firstName') firstName: string,
    @Query('lastName') lastName: string,
  ) {
    return this.UserService.findByName(firstName, lastName);
  }
}
