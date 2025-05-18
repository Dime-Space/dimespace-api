import { Body, Controller, HttpStatus, Post } from '@nestjs/common'
import { CompanyService } from './company.service'
import { CreateCompanyDTO } from './dtos/create-company.dto'
import { ResponseHelper } from 'src/common/utils/response.helper'

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async create(@Body() body: CreateCompanyDTO) {
    const company = await this.companyService.create(body)

    return ResponseHelper.formatResponse(
      HttpStatus.CREATED,
      'Company successfully created',
      company,
    )
  }
}
