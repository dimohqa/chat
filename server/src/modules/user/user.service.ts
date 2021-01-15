import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { hash } from 'bcrypt';
import { User, UserDocument } from '../../schemas/user.schema';
import { Friends, FriendsDocument } from '../../schemas/friends.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Friends.name) private friendsModel: Model<FriendsDocument>,
  ) {}

  async create(user: User) {
    const hashedPassword = await hash(user.password, 12);

    const userIsExist = await this.findUserByEmail(user.email);

    if (userIsExist) {
      throw new BadRequestException('User with this email already exists');
    }

    const createdUser = await new this.userModel({
      ...user,
      password: hashedPassword,
    }).save();

    await new this.friendsModel({
      userId: createdUser._id,
      friends: [],
    }).save();
  }

  async findUserByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async findOne(object: Partial<UserDocument>) {
    return this.userModel.findOne(object, {
      firstName: true,
      lastName: true,
      _id: false,
    });
  }

  async getFriends(userId: string) {
    const data = await this.friendsModel
      .findOne(
        {
          userId: new Types.ObjectId(userId),
        },
        { friends: true },
      )
      .populate({
        path: 'friends',
        model: User.name,
        select: {
          firstName: true,
          lastName: true,
        },
      });

    return data.friends;
  }

  async uploadAvatar(buffer: Buffer, userId: string) {
    return this.userModel.updateOne({ _id: userId }, { avatar: buffer });
  }
}
