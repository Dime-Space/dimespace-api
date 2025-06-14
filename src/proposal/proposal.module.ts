import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProposalEntity } from './entities/proposal.entity'
import { ProposalService } from './proposal.service'
import { ProposalController } from './proposal.controller'

@Module({
  imports: [TypeOrmModule.forFeature([ProposalEntity])],
  providers: [ProposalService],
  controllers: [ProposalController],
})
export class ProposalModule {}
