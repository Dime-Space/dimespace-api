import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MessageEntity } from 'src/message/message.entity'
import { MessageRepository } from './message.respository'
import { MessageService } from './message.service'
import { MessageController } from './message.controller'
import { ChatRepository } from 'src/chat/chat.respository'
import { ChatEntity } from 'src/chat/chat.entity'

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity, ChatEntity])],
  providers: [MessageRepository, MessageService, ChatRepository],
  exports: [MessageRepository],
  controllers: [MessageController],
})
export class MessageModule {}
