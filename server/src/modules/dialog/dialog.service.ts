import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Dialog, DialogDocument } from '../../schemas/dialog.schema';
import { Model } from 'mongoose';

@Injectable()
export class DialogService {
  constructor(
    @InjectModel(Dialog.name)
    private readonly dialogModel: Model<DialogDocument>,
  ) {}

  async getDialogs(userId: string) {
    return this.dialogModel.find({ author: userId });
  }
}
