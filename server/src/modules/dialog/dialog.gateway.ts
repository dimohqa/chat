import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { DialogService } from './dialog.service';
import { InjectModel } from '@nestjs/mongoose';
import { Dialog, DialogDocument } from '../../schemas/dialog.schema';
import { Model } from 'mongoose';
import { MessagesService } from '../messages/messages.service';

@WebSocketGateway()
export class DialogGateway {
  constructor(
    private readonly dialogService: DialogService,
    @InjectModel(Dialog.name)
    private readonly dialogModel: Model<DialogDocument>,
    private readonly messagesService: MessagesService,
  ) {}

  @SubscribeMessage('dialogs')
  async getDialogs(client: Socket) {
    return this.dialogService.getDialogs(client.request.userId);
  }

  @SubscribeMessage('sendMessage')
  async sendMessage(
    @MessageBody() body: { recipientId: string; content: string },
    @ConnectedSocket() client: Socket,
  ) {
    const userId = client.request.userId;

    const message = await this.messagesService.createMessage(
      userId,
      body.content,
    );

    let dialog = await this.dialogService.getDialog(
      client.request.userId,
      body.recipientId,
    );

    if (!dialog) {
      dialog = await this.dialogService.createDialog(userId, body.recipientId);
    }

    await this.dialogService.addMessage(dialog._id, message);
  }

  @SubscribeMessage('getMessagesByDialogId')
  async getMessagesByDialogId(@MessageBody() body: { dialogId: string }) {
    const dialog = await this.dialogService.getMessagesByDialogId(
      body.dialogId,
    );

    return dialog.messages;
  }
}
