import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Controller } from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
@WebSocketGateway()
export class UserGateway {
  constructor(private UserService: UserService) {}

  @SubscribeMessage('profile')
  async profile(client: Socket) {
    return await this.UserService.findOne({ _id: client.request.userId });
  }
}
