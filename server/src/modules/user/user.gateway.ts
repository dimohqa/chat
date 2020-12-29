import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class UserGateway {
  @SubscribeMessage('friends')
  getFriends(client: Socket, text: string) {
    console.log(client.handshake.headers.cookie);
    return 'Hello world!';
  }
}
