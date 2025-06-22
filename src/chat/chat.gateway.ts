import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { ChatService } from './chat.service'
import { WsJwtGuard } from 'src/auth/auth-ws.guard'
import { UseGuards } from '@nestjs/common'

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@UseGuards(WsJwtGuard)
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server

  constructor(private readonly chatService: ChatService) {}

  handleConnection(socket: Socket) {
    console.log(`Client connected: ${socket.id}`)
  }

  handleDisconnect(socket: Socket) {
    console.log(`Client disconnected: ${socket.id}`)
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(@MessageBody() chatId: string, @ConnectedSocket() client: Socket) {
    client.join(chatId)
    console.log(`Client ${client.id} joined room ${chatId}`)
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody()
    payload: {
      chatId: string
      senderId: number
      content: string
    },
    @ConnectedSocket() client: Socket,
  ) {
    const { chatId, senderId, content } = payload

    const message = await this.chatService.saveMessage({
      chatId,
      senderId,
      content,
    })

    this.server.to(chatId).emit('receiveMessage', message)
  }
}
