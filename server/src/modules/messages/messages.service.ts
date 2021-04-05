import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Message, MessageDocument } from '../../schemas/message.schema';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<MessageDocument>,
  ) {}

  async createMessage(userId: string, content: string) {
    return this.messageModel.create({
      createdAt: new Date(),
      author: Types.ObjectId(userId),
      content,
    });
  }
}
