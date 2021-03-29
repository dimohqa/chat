import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
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
  getDialogs(client: Socket) {
    return this.dialogService.getDialogs(client.request.userId);
  }

  @SubscribeMessage('sendMessage')
  async sendMessage(client: Socket, recipientId: string, content: string) {
    const userId = client.request.userId;

    const message = await this.messagesService.createMessage(userId, content);

    let dialog = await this.dialogService.getDialog(client.request.userId);

    if (!dialog) {
      dialog = await this.dialogService.createDialog(userId, recipientId);
    }

    await this.dialogService.addMessage(dialog._id, message);
  }
}
