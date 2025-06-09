import { Injectable } from '@nestjs/common';
import { CreateProposalDTO } from './dto/create-proposal.dto';
import { UpdateProposalDTO } from './dto/update-proposal.dto';

@Injectable()
export class ProposalService {
  create(createProposalDto: CreateProposalDTO) {
    return 'This action adds a new proposal';
  }

  findAll() {
    return `This action returns all proposal`;
  }

  findOne(id: number) {
    return `This action returns a #${id} proposal`;
  }

  update(id: number, updateProposalDto: UpdateProposalDTO) {
    return `This action updates a #${id} proposal`;
  }

  remove(id: number) {
    return `This action removes a #${id} proposal`;
  }
}
