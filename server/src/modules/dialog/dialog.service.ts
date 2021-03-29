import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Dialog, DialogDocument } from '../../schemas/dialog.schema';
import { Model } from 'mongoose';
import { Message } from '../../schemas/message.schema';

@Injectable()
export class DialogService {
  constructor(
    @InjectModel(Dialog.name)
    private readonly dialogModel: Model<DialogDocument>,
  ) {}

  async getDialogs(userId: string) {
    return this.dialogModel.find({ participants: userId });
  }

  async getDialog(userId: string) {
    return this.dialogModel.findOne({ participants: userId });
  }

  async createDialog(createdUserId: string, participantId: string) {
    return this.dialogModel.create({
      author: createdUserId,
      participant: participantId,
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
