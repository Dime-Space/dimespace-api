import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query } from '@nestjs/common'
import { CompanyService } from './company.service'
import { CreateCompanyDTO } from './dtos/create-company.dto'
import { ResponseHelper } from 'src/common/utils/response.helper'
import { UpdateCompanyDTO } from './dtos/update-company,dto'
import { TokenPayloadDTO } from 'src/auth/dtos/token.payload.dto'
import { UserData } from 'src/common/decorators/user-data.decorator'

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get(':id')
  async findById(@Param('id') id: number) {
    const company = await this.companyService.findById(id)
    return ResponseHelper.formatResponse(HttpStatus.OK, 'Company successfully found', company)
  }

  @Post()
  async create(@UserData() { id }: TokenPayloadDTO, @Body() body: CreateCompanyDTO) {
    const company = await this.companyService.create(id, body)

    return ResponseHelper.formatResponse(
      HttpStatus.CREATED,
      'Company successfully created',
      company,
    )
  }

  @Put(':id')
  async update(@Param() id: number, @Body() body: UpdateCompanyDTO) {
    const company = await this.companyService.update(id, body)

    return ResponseHelper.formatResponse(HttpStatus.OK, 'Company successfully updated', company)
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.companyService.delete(id)

    return ResponseHelper.formatResponse(HttpStatus.OK, 'Company successfully deleted')
  }

   @Get()
   async find(
    @Query('companyName') nomeDaEmpresa?: string, // Pega o valor de ?companyName=... da URL
  ) {
    if (nomeDaEmpresa) {
      // Se o parâmetro foi passado, chama o serviço de busca por nome
      return this.companyService.findByNome(nomeDaEmpresa);
    } else {
      // Se nenhum parâmetro foi passado, retorna todas as empresas (comportamento antigo)
      return this.companyService.findAll();
    }
  }
}

