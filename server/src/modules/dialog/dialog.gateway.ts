import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { DialogService } from './dialog.service';

@WebSocketGateway()
export class DialogGateway {
  constructor(private DialogService: DialogService) {}

  @SubscribeMessage('dialogs')
  getDialogs(client: Socket) {
    return this.DialogService.getDialogs(client.request.userId);
  }
}
