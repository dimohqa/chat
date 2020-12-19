import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hash } from 'bcrypt';
import { User, UserDocument } from '../../schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(user: User) {
    const hashedPassword = await hash(user.password, 12);

    const userIsExist = await this.findUserByEmail(user.email);

    if (userIsExist) {
      throw new BadRequestException('User with this email already exists');
    }

    const createdUser = new this.userModel({
      ...user,
      password: hashedPassword,
    });

    await createdUser.save();
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

  async findByName(firstName: string, lastName: string): Promise<User[]> {
    return this.userModel.find(
      { $or: [{ firstName }, { lastName }] },
      { password: false },
    );
  }
}
