import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { AddressEntity } from './address.entity'

@Injectable()
export class AddressRepository extends Repository<AddressEntity> {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly repository: Repository<AddressEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner)
  }

  async findAll(): Promise<AddressEntity[]> {
    return this.find()
  }

  async findById(id: number): Promise<AddressEntity | null> {
    return this.findOne({ where: { id } })
  }
}
