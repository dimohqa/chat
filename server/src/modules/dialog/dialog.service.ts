import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Dialog, DialogDocument } from '../../schemas/dialog.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class DialogService {
  constructor(
    @InjectModel(Dialog.name) private dialogModel: Model<DialogDocument>,
  ) {}

  async getDialogs(userId: string) {
    return this.dialogModel.find({ author: userId });
  }
}
