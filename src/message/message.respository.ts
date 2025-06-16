import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { MessageEntity } from './message.entity'

@Injectable()
export class MessageRepository extends Repository<MessageEntity> {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly repository: Repository<MessageEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner)
  }
}
