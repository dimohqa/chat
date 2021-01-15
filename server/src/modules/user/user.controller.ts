import {
  Controller,
  Get,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserId } from '../../helpers/user-id.decorator';
import { AuthGuard } from '../../middlewares/auth.guard';

@Controller('user')
export class UserController {
  constructor(private UserService: UserService) {}

  @Get('/get')
  async get(@Request() req: { userId: string }) {
    return this.UserService.findOne({ _id: req.userId });
  }

  @Post('/uploadAvatar')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadAvatar(@UploadedFile() avatar, @UserId() userId: string) {
    console.log(avatar);
    console.log(userId);
    return this.UserService.uploadAvatar(avatar.buffer, userId);
  }
}
