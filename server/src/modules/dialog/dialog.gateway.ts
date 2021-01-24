import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { DialogService } from './dialog.service';

@WebSocketGateway()
export class DialogGateway {
  constructor(private readonly dialogService: DialogService) {}

  @SubscribeMessage('dialogs')
  getDialogs(client: Socket) {
    return this.dialogService.getDialogs(client.request.userId);
  }
}
