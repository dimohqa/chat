import { Controller, Get, Request } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private UserService: UserService) {}

  @Get('/get')
  async get(@Request() req: { userId: string }) {
    return this.UserService.findOne({ _id: req.userId });
  }
}
