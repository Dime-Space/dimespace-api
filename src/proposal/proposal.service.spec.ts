import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proposal } from './entities/proposal.entity';
import { CreateProposalDTO } from './dto/create-proposal.dto';
import { UpdateProposalDTO } from './dto/update-proposal.dto';

@Injectable()
export class ProposalService {
  constructor(
    @InjectRepository(Proposal)
    private readonly proposalRepository: Repository<Proposal>,
  ) {}

  async findAll(): Promise<Proposal[]> {
    return this.proposalRepository.find();
  }

  async findOne(id: number): Promise<Proposal> {
    const proposal = await this.proposalRepository.findOneBy({ id });
    if (!proposal) {
      throw new NotFoundException(`Proposal with ID ${id} not found`);
    }
    return proposal;
  }

  async create(data: CreateProposalDTO): Promise<Proposal> {
    const proposal = this.proposalRepository.create(data);
    return this.proposalRepository.save(proposal);
  }

  async update(id: number, data: UpdateProposalDTO): Promise<Proposal> {
    const proposal = await this.findOne(id);
    Object.assign(proposal, data);
    return this.proposalRepository.save(proposal);
  }

  async remove(id: number): Promise<void> {
    const proposal = await this.findOne(id);
    await this.proposalRepository.softRemove(proposal);
  }
}
