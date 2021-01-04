import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { AuthService } from './auth.service';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class AuthGateway {
  constructor(private AuthService: AuthService) {}

  @SubscribeMessage('logout')
  async logout(client: Socket) {
    await this.AuthService.deleteRefreshToken(
      client.request.userId,
      client.request.refreshToken,
    );

    return true;
  }
}
