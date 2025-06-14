import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ChatEntity } from './chat.entity'
import { ChatController } from './chat.controller'
import { MessageEntity } from 'src/message/message.entity'
import { ChatRepository } from './chat.respository'
import { ChatService } from './chat.service'
import { CompanyRepository } from 'src/company/company.repository'
import { UserRepository } from 'src/user/user.repository'
import { UserEntity } from 'src/user/user.entity'
import { CompanyEntity } from 'src/company/company.entity'

@Module({
  imports: [TypeOrmModule.forFeature([ChatEntity, MessageEntity, UserEntity, CompanyEntity])],
  providers: [ChatRepository, ChatService, UserRepository, CompanyRepository],
  exports: [ChatRepository],
  controllers: [ChatController],
})
export class ChatModule {}
