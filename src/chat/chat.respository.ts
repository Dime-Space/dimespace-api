import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { ChatEntity } from './chat.entity'

@Injectable()
export class ChatRepository extends Repository<ChatEntity> {
  constructor(
    @InjectRepository(ChatEntity)
    private readonly repository: Repository<ChatEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner)
  }
}
