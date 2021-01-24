import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { AuthService } from './auth.service';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class AuthGateway {
  constructor(private readonly authService: AuthService) {}

  @SubscribeMessage('logout')
  async logout(client: Socket) {
    await this.authService.deleteRefreshToken(
      client.request.userId,
      client.request.refreshToken,
    );

    return true;
  }
}
