import { Controller, Post, Body, HttpStatus, Get, Param, Patch, Delete } from '@nestjs/common'
import { ResponseHelper } from 'src/common/utils/response.helper'
import { UserData } from 'src/common/decorators/user-data.decorator'
import { TokenPayloadDTO } from 'src/auth/dtos/token.payload.dto'
import { MessageService } from './message.service'
import { SendMessageDTO } from './dtos/send-message.dto'

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async sendMessage(@UserData() { id }: TokenPayloadDTO, @Body() body: SendMessageDTO) {
    const message = await this.messageService.sendMessage(id, body)
    return ResponseHelper.formatResponse(HttpStatus.CREATED, 'Message successfully sent', message)
  }
}
