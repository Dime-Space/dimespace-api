import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { UserEntity } from './user.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner)
  }

  async findAll(): Promise<UserEntity[]> {
    return this.find()
  }

  async findById(id: number): Promise<UserEntity | null> {
    return this.findOne({ where: { id } })
  }
}
