import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP')

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, baseUrl } = request
    const userAgent = request.get('user-agent') || ''
    const startTime = Date.now()
    this.logger.log(`[<---] [${method}] ${baseUrl} - Agent ${userAgent}`)

    response.on('close', () => {
      const { statusCode } = response
      const timeSpent = Date.now() - startTime

      this.logger.log(
        `[--->] [${method}] ${baseUrl} - Response with status ${statusCode} in ${timeSpent}ms`,
      )
    })

    next()
  }
}
