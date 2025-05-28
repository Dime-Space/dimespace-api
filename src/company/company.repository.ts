import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { CompanyEntity } from './company.entity'

@Injectable()
export class CompanyRepository extends Repository<CompanyEntity> {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly repository: Repository<CompanyEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner)
  }

  async findAll(): Promise<CompanyEntity[]> {
    return this.find()
  }

  async findById(id: number): Promise<CompanyEntity | null> {
    return this.findOne({ where: { id } })
  }
}
