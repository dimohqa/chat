import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Dialog, DialogDocument } from '../../schemas/dialog.schema';
import { Model, Types } from 'mongoose';
import { Message } from '../../schemas/message.schema';
import { User } from '../../schemas/user.schema';

const { ObjectId } = Types;

@Injectable()
export class DialogService {
  constructor(
    @InjectModel(Dialog.name)
    private readonly dialogModel: Model<DialogDocument>,
  ) {}

  async getDialogs(userId: string) {
    return this.dialogModel
      .find(
        { participants: ObjectId(userId) },
        { participants: true, messages: { $slice: ['$messages', -1] } },
      )
      .populate({
        path: 'participants',
        model: User.name,
        select: {
          firstName: true,
          lastName: true,
        },
      })
      .populate({
        path: 'messages',
        model: Message.name,
      });
  }

  async getDialog(userId: string, recipientId: string) {
    return this.dialogModel.findOne({
      participants: {
        $all: [ObjectId(userId), ObjectId(recipientId)],
      },
    });
  }

  async createDialog(createdUserId: string, participantId: string) {
    return this.dialogModel.create({
      participants: [ObjectId(participantId), ObjectId(createdUserId)],
      messages: [],
      name: '',
    });
  }

  async addMessage(dialogId: string, message: Message) {
    return this.dialogModel.findByIdAndUpdate(dialogId, {
      $push: { messages: message },
    });
  }
}
