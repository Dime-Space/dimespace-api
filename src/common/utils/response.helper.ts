import { HttpStatus } from '@nestjs/common'

export class ResponseHelper {
  static formatResponse(statusCode: HttpStatus, message: string, data?: any) {
    return {
      statusCode,
      message,
      data,
      timestamp: new Date().toISOString(),
    }
  }
}
