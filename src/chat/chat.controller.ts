import { Controller, Post, Body, HttpStatus, Get, Param, Patch, Delete } from '@nestjs/common'
import { ResponseHelper } from 'src/common/utils/response.helper'
import { CreateChatDTO } from './dtos/create-chat.dto'
import { UserData } from 'src/common/decorators/user-data.decorator'
import { TokenPayloadDTO } from 'src/auth/dtos/token.payload.dto'
import { ChatService } from './chat.service'

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async create(@UserData() { id }: TokenPayloadDTO, @Body() body: CreateChatDTO) {
    const chat = await this.chatService.create(id, body)
    return ResponseHelper.formatResponse(HttpStatus.CREATED, 'Chat successfully created', chat)
  }

  @Get()
  async list(@UserData() { id: userId }: TokenPayloadDTO) {
    const chat = await this.chatService.list(userId)
    return ResponseHelper.formatResponse(HttpStatus.OK, 'Chats successfully retrieved', chat)
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    const chat = await this.chatService.findById(id)
    return ResponseHelper.formatResponse(HttpStatus.OK, 'Chat successfully retrieved', chat)
  }
}
