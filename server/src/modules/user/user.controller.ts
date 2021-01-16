import {
  Controller,
  Get,
  Post,
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
  @UseGuards(AuthGuard)
  async get(@UserId() userId: string) {
    return this.UserService.findOne({ _id: userId });
  }

  @Post('/uploadAvatar')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('avatar', { dest: './uploads' }))
  async uploadAvatar(@UploadedFile() avatar, @UserId() userId: string) {
    return this.UserService.uploadAvatar(avatar.buffer, userId);
  }
}
