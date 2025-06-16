import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  HttpStatus,
} from '@nestjs/common'
import { ProposalService } from './proposal.service'
import { CreateProposalDTO } from './dto/create-proposal.dto'
import { UpdateProposalDTO } from './dto/update-proposal.dto'
import { Auth } from 'src/common/decorators/auth.decorator'
import { ResponseHelper } from 'src/common/utils/response.helper'
import { AcceptProposalDTO } from './dto/accept-proposal.dto'
import { TokenPayloadDTO } from 'src/auth/dtos/token.payload.dto'
import { UserData } from 'src/common/decorators/user-data.decorator'

@Controller('proposals')
export class ProposalController {
  constructor(private readonly proposalService: ProposalService) {}

  @Auth(false)
  @Get()
  async findAll() {
    const proposals = await this.proposalService.findAll()
    return ResponseHelper.formatResponse(
      HttpStatus.OK,
      'Proposals successfully retrieved',
      proposals,
    )
  }

  @Get('user')
  async listUserCurrentProposals(@UserData() { id }: TokenPayloadDTO) {
    const proposal = await this.proposalService.listCurrentUserProposals(id)
    return ResponseHelper.formatResponse(HttpStatus.OK, 'Proposal successfully retrieved', proposal)
  }

  @Get('company/:id')
  async listCompanyCurrentProposals(
    @UserData() { id: userId }: TokenPayloadDTO,
    @Param('id', ParseIntPipe) companyId: number,
  ) {
    const proposal = await this.proposalService.listCurrentCompanyProposals(userId, companyId)
    return ResponseHelper.formatResponse(HttpStatus.OK, 'Proposal successfully retrieved', proposal)
  }

  @Auth(false)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const proposal = await this.proposalService.findOne(id)
    return ResponseHelper.formatResponse(HttpStatus.OK, 'Proposal successfully retrieved', proposal)
  }

  @Post('create')
  async create(@Body() data: CreateProposalDTO) {
    const proposal = await this.proposalService.create(data)
    return ResponseHelper.formatResponse(
      HttpStatus.CREATED,
      'Proposal successfully created',
      proposal,
    )
  }

  @Post('accept')
  async acceptProposal(@UserData() { id }: TokenPayloadDTO, @Body() data: AcceptProposalDTO) {
    const proposal = await this.proposalService.acceptProposal(id, data)
    return ResponseHelper.formatResponse(
      HttpStatus.CREATED,
      'Proposal accepted successfully',
      proposal,
    )
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateProposalDTO) {
    const proposal = await this.proposalService.update(id, data)
    return ResponseHelper.formatResponse(HttpStatus.OK, 'Proposal successfully updated', proposal)
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.proposalService.remove(id)
    return ResponseHelper.formatResponse(HttpStatus.OK, 'Proposal deleted successfully')
  }
}
