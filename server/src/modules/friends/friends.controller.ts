import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { UserId } from '../../helpers/user-id.decorator';
import { AuthGuard } from '../../middlewares/auth.guard';

@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Get('search')
  @UseGuards(AuthGuard)
  find(@UserId() userId: string, @Query('search') search: string) {
    return this.friendsService.find(userId, search);
  }
}
