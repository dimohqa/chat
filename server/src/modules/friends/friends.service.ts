import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Friends, FriendsDocument } from '../../schemas/friends.schema';
import { Model, Types } from 'mongoose';
import { User } from '../../schemas/user.schema';

@Injectable()
export class FriendsService {
  constructor(
    @InjectModel(Friends.name) private friendsModel: Model<FriendsDocument>,
  ) {}

  async find(userId: string, search: string) {
    const data = await this.friendsModel
      .findOne(
        {
          userId: Types.ObjectId(userId),
        },
        { friends: true },
      )
      .populate({
        path: 'friends',
        model: User.name,
        select: {
          firstName: true,
          lastName: true,
          avatar: true,
          _id: true,
        },
        ...(search && {
          match: {
            $text: {
              $search: search,
            },
          },
        }),
      });

    return data.friends;
  }
}
