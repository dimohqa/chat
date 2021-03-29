import { Module } from '@nestjs/common';
import { DialogGateway } from './dialog.gateway';
import { DialogService } from './dialog.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DialogSchema } from '../../schemas/dialog.schema';
import { Dialog } from '../../schemas/dialog.schema';
import { MessagesService } from '../messages/messages.service';
import { Message, MessageSchema } from '../../schemas/message.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Dialog.name,
        schema: DialogSchema,
      },
      {
        name: Message.name,
        schema: MessageSchema,
      },
    ]),
  ],
  providers: [DialogGateway, DialogService, MessagesService],
})
export class DialogModule {}
