import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FriendsService } from './friends.service';
import { UserId } from '../../helpers/user-id.decorator';
import { AuthGuard } from '../../middlewares/auth.guard';

@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Get('search')
  @UseGuards(AuthGuard)
  async search(@UserId() userId: string, @Query('search') search: string) {
    return this.friendsService.search(userId, search);
  }

  @Patch('add/:id')
  @UseGuards(AuthGuard)
  async add(@UserId() userId: string, @Param('id') id: string) {
    await this.friendsService.add(userId, id);
  }

  @Patch('delete/:id')
  @UseGuards(AuthGuard)
  async delete(@UserId() userId: string, @Param('id') id: string) {
    await this.friendsService.delete(userId, id);
  }
}
