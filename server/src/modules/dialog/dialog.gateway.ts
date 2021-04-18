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
import { Message } from '../../schemas/message.schema';
import { User } from '../../schemas/user.schema';

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
    return await this.dialogService.getDialogs(client.request.userId);
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

    let dialog = await this.dialogService.getDialog(userId, body.recipientId);

    // let dialog = await this.dialogService.getDialogById(body.dialogId);

    if (!dialog) {
      dialog = await this.dialogService.createDialog(userId, body.recipientId);
    }

    await this.dialogService.addMessage(dialog._id, message);

    client.emit('newMessage', message);
    client.to(body.recipientId).emit('newMessage', message);
  }

  @SubscribeMessage('getDialog')
  async getMessagesByDialogId(
    @MessageBody() body: { recipientId: string },
    @ConnectedSocket() client: Socket,
  ): Promise<DialogDocument> {
    const dialog = await this.dialogService.getDialogByIds(
      body.recipientId,
      client.request.userId,
    );

    if (!dialog) {
      return null;
    }

    return await this.dialogModel.populate(dialog, {
      path: 'messages',
      model: Message.name,
      populate: {
        path: 'author',
        model: User.name,
      },
    });
  }
}
