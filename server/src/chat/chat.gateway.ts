import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { addUser, getUser } from '../utils/user';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  @WebSocketServer()
  io: Server;

  @SubscribeMessage('join-room')
  handleJoinRoom(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
    const { username, room } = data;
    const { error, user } = addUser({ id: socket.id, username, room });
    if (error) {
      return error;
    }
    socket.join(room);
    socket.emit('receive-msg', {
      msg: `welcome to the room`,
      user: { username: 'admin' },
    });
    socket.broadcast
      .to(room)
      .emit('receive-msg', { msg: `${username} has joined`, user });
  }

  @SubscribeMessage('send-msg')
  handleSendMessage(
    @MessageBody() msg: any,
    @ConnectedSocket() socket: Socket,
  ) {
    const user = getUser(socket.id);
    console.log(user);

    this.io.to(user.room).emit('receive-msg', { msg, user });
  }
}
