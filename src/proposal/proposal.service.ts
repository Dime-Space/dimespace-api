import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateProposalDTO } from './dto/create-proposal.dto'
import { UpdateProposalDTO } from './dto/update-proposal.dto'
import { ProposalRepository } from './proposal.respository'
import { AcceptProposalDTO } from './dto/accept-proposal.dto'

@Injectable()
export class ProposalService {
  constructor(private readonly proposalRepository: ProposalRepository) {}

  async create(createProposalDto: CreateProposalDTO) {
    const proposal = this.proposalRepository.create(createProposalDto)
    return this.proposalRepository.save(proposal)
  }

  async acceptProposal(userId: number, dto: AcceptProposalDTO) {
    const proposal = await this.proposalRepository.findOne({
      where: { id: dto.proposalId },
    })
    if (!proposal || !dto.proposalId)
      throw new HttpException('Proposal not found', HttpStatus.NOT_FOUND)

    if (proposal?.user_id === userId)
      throw new HttpException('Proposal already accepted', HttpStatus.BAD_REQUEST)

    if (proposal?.user_id !== null)
      throw new HttpException('Proposal already accepted', HttpStatus.BAD_REQUEST)

    proposal.user_id = userId
    return await this.proposalRepository.save(proposal)
  }

  async listCurrentUserProposals(userId: number) {
    return await this.proposalRepository.find({
      order: { created_at: 'DESC' },
      relations: ['company'],
      where: { user: { id: userId } },
    })
  }

  async listCurrentCompanyProposals(userId: number, companyId: number) {
    return await this.proposalRepository.find({
      order: { created_at: 'DESC' },
      relations: ['company'],
      where: { company: { id: companyId, userOwner: { id: userId } } },
    })
  }

  async findAll() {
    return await this.proposalRepository.find({
      order: { created_at: 'DESC' },
      relations: ['company'],
    })
  }

  async findOne(id: number) {
    const proposal = await this.proposalRepository.findOne({
      where: { id },
      relations: ['company', 'user'],
      select: {
        user: { id: true, name: true, email: true, image_key: true, password: false },
      },
    })
    if (!proposal || !id) {
      throw new HttpException('Proposal not found', HttpStatus.NOT_FOUND)
    }
    return proposal
  }

  async update(id: number, updateProposalDto: UpdateProposalDTO) {
    const proposal = await this.findOne(id)
    Object.assign(proposal, updateProposalDto)
    return this.proposalRepository.save(proposal)
  }

  async remove(id: number) {
    const proposal = await this.findOne(id)
    if (!proposal) {
      throw new HttpException('Proposal not found', HttpStatus.NOT_FOUND)
    }
    await this.proposalRepository.softRemove(proposal)
  }
}
