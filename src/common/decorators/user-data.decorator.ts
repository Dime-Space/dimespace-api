import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { TokenPayloadDTO } from 'src/auth/dtos/token.payload.dto'

export const UserData = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): TokenPayloadDTO | null => {
    const request = ctx.switchToHttp().getRequest()
    const user = request.payloadDTO

    if (TokenPayloadDTO.matchesObject(user)) {
      return user as TokenPayloadDTO
    }

    return null
  },
)
