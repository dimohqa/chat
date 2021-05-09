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
import { Model, Types } from 'mongoose';
import { MessagesService } from '../messages/messages.service';
import { Message } from '../../schemas/message.schema';
import { User } from '../../schemas/user.schema';
const { ObjectId } = Types;

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

  @SubscribeMessage('getRoomById')
  async getRoomById(@MessageBody() body: { roomId: string }) {
    const room = await this.dialogService.getDialogById(body.roomId);

    if (!room) {
      return null;
    }

    return this.dialogModel.populate(room, [
      {
        path: 'messages',
        model: Message.name,
        populate: {
          path: 'author',
          model: User.name,
        },
      },
      {
        path: 'participants',
        model: User.name,
        select: {
          avatar: true,
          firstName: true,
          lastName: true,
        },
      },
    ]);
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
      return new this.dialogModel({
        participants: [
          ObjectId(body.recipientId),
          ObjectId(client.request.userId),
        ],
        messages: [],
        name: '',
      }).populate({
        model: User.name,
        path: 'participants',
        select: {
          avatar: true,
          firstName: true,
          lastName: true,
        },
      });
    }

    return this.dialogModel.populate(dialog, [
      {
        path: 'messages',
        model: Message.name,
        populate: {
          path: 'author',
          model: User.name,
        },
      },
      {
        path: 'participants',
        model: User.name,
        select: {
          avatar: true,
          firstName: true,
          lastName: true,
        },
      },
    ]);
  }
}
