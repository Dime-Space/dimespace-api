import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common'
import { Response } from 'express'
import { ResponseHelper } from '../utils/response.helper'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    let status = HttpStatus.INTERNAL_SERVER_ERROR
    let message = 'Internal server error'
    let errorData: string | object | null = null

    if (exception instanceof HttpException) {
      status = exception.getStatus()
      const exceptionResponse = exception.getResponse()
      message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : (exceptionResponse as any).message || message
      errorData = exceptionResponse
    } else if (exception instanceof Error) {
      message = exception.message
      errorData = {
        name: exception.name,
        stack: exception.stack,
      }
    }

    const responseBody = ResponseHelper.formatResponse(status, message, errorData)

    response.status(status).json(responseBody)
  }
}
