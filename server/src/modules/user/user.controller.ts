import {
  Body,
  Controller,
  Get, Param,
  Patch,
  Post, Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserId } from '../../helpers/user-id.decorator';
import { AuthGuard } from '../../middlewares/auth.guard';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('search')
  @UseGuards(AuthGuard)
  async search(@UserId() userId: string, @Query('search') search: string) {
    return this.userService.search(userId, search);
  }

  @Get('/get')
  @UseGuards(AuthGuard)
  async get(@UserId() userId: string) {
    return this.userService.findOne({ _id: userId });
  }

  @Post('/uploadAvatar')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './../client/dist/client/',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadAvatar(@UploadedFile() avatar, @UserId() userId: string) {
    await this.userService.saveAvatarFilename(avatar.filename, userId);
    return {
      filename: avatar.filename,
    };
  }

  @Patch()
  @UseGuards(AuthGuard)
  async update(
    @Body()
    user: {
      firstName?: string;
      lastName?: string;
      email?: string;
    },
    @UserId() userId,
  ) {
    return this.userService.update(user, userId);
  }
}
