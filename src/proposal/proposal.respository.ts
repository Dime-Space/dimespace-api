import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { ProposalEntity } from './proposal.entity'

@Injectable()
export class ProposalRepository extends Repository<ProposalEntity> {
  constructor(
    @InjectRepository(ProposalEntity)
    private readonly repository: Repository<ProposalEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner)
  }
}
