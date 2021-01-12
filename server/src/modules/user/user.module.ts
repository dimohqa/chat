import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from '../../schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserGateway } from './user.gateway';
import { AuthService } from '../auth/auth.service';
import {
  RefreshToken,
  RefreshTokenSchema,
} from '../../schemas/refreshToken.schema';
import { Friends, FriendsSchema } from '../../schemas/friends.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Friends.name, schema: FriendsSchema }]),
    MongooseModule.forFeature([
      { name: RefreshToken.name, schema: RefreshTokenSchema },
    ]),
  ],
  controllers: [UserController, UserGateway],
  providers: [UserService, UserGateway, AuthService],
  exports: [UserService],
})
export class UserModule {}
