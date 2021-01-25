import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Friends, FriendsDocument } from '../../schemas/friends.schema';
import { Model, Types } from 'mongoose';
import { User } from '../../schemas/user.schema';

@Injectable()
export class FriendsService {
  constructor(
    @InjectModel(Friends.name)
    private readonly friendsModel: Model<FriendsDocument>,
  ) {}

  async search(userId: string, search: string) {
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

  async add(userId: string, friendId: string) {
    try {
      await this.friendsModel.updateOne(
        { userId: Types.ObjectId(userId) },
        { $addToSet: { friends: Types.ObjectId(friendId) } },
      );
    } catch (error) {
      throw new HttpException(
        'Некорректный идентификатор пользователя',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(userId: string, friendId: string) {
    try {
      await this.friendsModel.updateOne(
        { userId: Types.ObjectId(userId) },
        { $pull: { friends: Types.ObjectId(friendId) } },
      );
    } catch (error) {
      throw new HttpException(
        'Некорректный идентификатор пользователя',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
