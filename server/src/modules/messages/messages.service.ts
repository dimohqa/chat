import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Message, MessageDocument } from '../../schemas/message.schema';
import { User } from '../../schemas/user.schema';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<MessageDocument>,
  ) {}

  async createMessage(userId: string, content: string) {
    const createdMessage = await this.messageModel.create({
      createdAt: new Date(),
      author: Types.ObjectId(userId),
      content,
    });

    return this.messageModel.populate(createdMessage, {
      path: 'author',
      model: User.name,
      select: {
        firstName: true,
        lastName: true,
        avatar: true,
      },
    });
  }
}
