import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hash } from 'bcrypt';
import { User, UserDocument } from '../../schemas/user.schema';
import { Friends, FriendsDocument } from '../../schemas/friends.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Friends.name)
    private readonly friendsModel: Model<FriendsDocument>,
  ) {}

  async search(userId: string, search: string, skip: number, take: number) {
    const aggregatePaginationUsers = await this.userModel.aggregate([
      { $match: { $text: { $search: search } } },
      { $addFields: { score: { $meta: 'textScore' } } },
      {
        $facet: {
          totalCount: [{ $count: 'totalCount' }],
          foundItems: [
            { $skip: skip },
            { $limit: take },
            {
              $project: {
                firstName: true,
                lastName: true,
                _id: true,
                avatar: true,
              },
            },
          ],
        },
      },
      {
        $project: {
          foundItems: '$foundItems',
          totalCount: '$totalCount.totalCount',
        },
      },
      {
        $unwind: '$totalCount',
      },
    ]);

    return aggregatePaginationUsers[0];
  }

  async create(user: User): Promise<string> {
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

    return createdUser._id;
  }

  async findUserByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async findOne(object: Partial<UserDocument>) {
    return this.userModel.findOne(object, {
      firstName: true,
      lastName: true,
      avatar: true,
      email: true,
      _id: false,
    });
  }

  async getById(userId: string) {
    return this.userModel.findById(userId, {
      firstName: true,
      lastName: true,
      avatar: true,
      email: true,
    });
  }

  async saveAvatarFilename(filename: string, userId: string) {
    return this.userModel.updateOne({ _id: userId }, { avatar: filename });
  }

  async update(
    user: {
      firstName?: string;
      lastName?: string;
      email?: string;
    },
    userId: string,
  ) {
    if (user.email) {
      const emailAlreadyExist = await this.userModel.findOne({
        email: user.email,
      });

      if (emailAlreadyExist) {
        throw new HttpException(
          'Пользователь с таким email уже существует.',
          HttpStatus.CONFLICT,
        );
      }
    }

    await this.userModel.updateOne({ _id: userId }, user);

    return user;
  }
}
