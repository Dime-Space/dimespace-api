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
import { ChatGateway } from './chat.gateway'
import { MessageRepository } from 'src/message/message.respository'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
    TypeOrmModule.forFeature([ChatEntity, MessageEntity, UserEntity, CompanyEntity]),
  ],
  providers: [
    ChatGateway,
    ChatRepository,
    ChatService,
    UserRepository,
    CompanyRepository,
    MessageRepository,
  ],
  exports: [ChatRepository],
  controllers: [ChatController],
})
export class ChatModule {}
