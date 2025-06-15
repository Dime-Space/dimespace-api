import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProposalEntity } from './proposal.entity'
import { ProposalService } from './proposal.service'
import { ProposalController } from './proposal.controller'
import { ProposalRepository } from './proposal.respository'

@Module({
  imports: [TypeOrmModule.forFeature([ProposalEntity])],
  providers: [ProposalService, ProposalRepository],
  controllers: [ProposalController],
})
export class ProposalModule {}
