import { Controller, Get, HttpStatus } from '@nestjs/common'
import { ResponseHelper } from './common/utils/response.helper'

@Controller('health')
export class AppController {
  @Get()
  checkHealth() {
    return ResponseHelper.formatResponse(HttpStatus.OK, 'Check')
  }
}
