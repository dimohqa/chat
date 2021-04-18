import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from './modules/auth/auth.service';

@WebSocketGateway()
export class AppGateway implements OnGatewayConnection {
  constructor(private AuthService: AuthService) {}

  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket) {
    try {
      await this.AuthService.checkAuthorization(client);
      client.join(client.request.userId, (err) => {
        if (!err) {
          console.log('client connected to ' + client.request.userId + ' room');
        }
      });
      client.emit('connection', {
        connection: true,
        userId: client.request.userId,
      });
    } catch (error) {
      console.log('error connection: ', error);
      client.emit('errorAuth');
    }
  }
}
