import { HttpException, HttpStatus, Injectable } from '@nestjs/common'

import { MessageRepository } from './message.respository'
import { ChatRepository } from 'src/chat/chat.respository'
import { SendMessageDTO } from './dtos/send-message.dto'

@Injectable()
export class MessageService {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly chatRepository: ChatRepository,
  ) {}

  async sendMessage(userId: number, dto: SendMessageDTO) {
    const chat = await this.chatRepository.findOne({ where: { id: dto.chatId } })
    if (!chat || !dto.chatId) throw new HttpException(`Chat not found`, HttpStatus.NOT_FOUND)

    const message = this.messageRepository.create({
      chat,
      user: { id: userId },
      content: dto.message,
    })
    await this.messageRepository.save(message)

    return message
  }
}
