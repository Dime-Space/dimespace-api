import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ProposalService } from './proposal.service';
import { CreateProposalDTO } from './dto/create-proposal.dto';
import { UpdateProposalDTO } from './dto/update-proposal.dto';
import { Auth } from 'src/auth/auth.decorator';

@Controller('proposals')
export class ProposalController {
  constructor(private readonly proposalService: ProposalService) {}
@Auth(false)
  @Get()
  async findAll() {
    return this.proposalService.findAll();
  }
@Auth(false)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.proposalService.findOne(id);
  }

  @Post()
  async create(@Body() data: CreateProposalDTO) {
    return this.proposalService.create(data);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateProposalDTO) {
    return this.proposalService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.proposalService.remove(id);
    return { message: 'Proposal deleted successfully' };
  }
}
