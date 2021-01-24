import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Friends, FriendsSchema } from '../../schemas/friends.schema';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import {
  RefreshToken,
  RefreshTokenSchema,
} from '../../schemas/refreshToken.schema';
import { User, UserSchema } from '../../schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Friends.name, schema: FriendsSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: RefreshToken.name, schema: RefreshTokenSchema },
    ]),
  ],
  providers: [FriendsService, AuthService, UserService],
  controllers: [FriendsController],
})
export class FriendsModule {}
