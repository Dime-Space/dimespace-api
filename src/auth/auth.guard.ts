import { ExecutionContext, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { TokenPayloadDTO } from './dtos/token.payload.dto'
import { BearerTokenProcessor } from 'src/common/functions/bearer-token.processor'

@Injectable()
export class AuthGuard {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const checkJWT = this.reflector.get<boolean>('jwt', context.getHandler()) ?? true
    const request = context.switchToHttp().getRequest()

    if (checkJWT === false) return true

    const authorization = request.headers['authorization']

    const payload = await this.verifyAuthorization(authorization)

    request.payloadDTO = payload

    return true
  }

  async verifyAuthorization(authorization: string | undefined): Promise<TokenPayloadDTO> {
    if (!authorization) throw new UnauthorizedException('Authorization header is required')
    if (!authorization.includes(' '))
      throw new UnauthorizedException('Invalid authorization format')
    const [type, token] = authorization.split(' ')

    const allowedAuthorizationTypes = ['Bearer']
    if (!allowedAuthorizationTypes.includes(type))
      throw new UnauthorizedException(
        `Invalid type for authorization, allowed types are ${allowedAuthorizationTypes}`,
      )

    switch (type) {
      case 'Bearer': {
        const bearerTokenProcessor = new BearerTokenProcessor(this.jwtService, token)
        if (!bearerTokenProcessor.isBearerToken())
          throw new UnauthorizedException('JWT decode error')
        if (!bearerTokenProcessor.isSignatureValid())
          throw new UnauthorizedException('Signature is invalid or token already expired')
        // // const userEntity = await this.prisma.user.findFirst({
        // //   where: {
        // //     id: bearerTokenProcessor?.payload?.id,
        // //     cpf: bearerTokenProcessor?.payload?.cpf,
        // //     email: bearerTokenProcessor?.payload?.email,
        // //   },
        // // })
        // // if (!userEntity) throw UnauthorizedException
        // return new TokenPayloadDTO(userEntity.id, userEntity.email, userEntity.cpf)
      }
      default:
        throw new UnauthorizedException(
          `Invalid type for authorization, allowed types are ${allowedAuthorizationTypes}`,
        )
    }
  }
}
