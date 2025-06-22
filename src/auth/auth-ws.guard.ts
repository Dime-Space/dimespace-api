import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { TokenPayloadDTO } from './dtos/token.payload.dto'
import { BearerTokenProcessor } from 'src/common/functions/bearer-token.processor'
import { UserRepository } from 'src/user/user.repository'
import { Socket } from 'socket.io'

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client: Socket = context.switchToWs().getClient<Socket>()

    const token = client.handshake.headers.authorization

    if (!token) throw new UnauthorizedException('Token não fornecido')

    const payload = await this.verifyAuthorization(token)
    client.data.user = payload

    return true
  }

  async verifyAuthorization(authHeader: string): Promise<TokenPayloadDTO> {
    if (!authHeader.includes(' ')) throw new UnauthorizedException('Formato inválido')
    const [type, token] = authHeader.split(' ')
    if (type !== 'Bearer') throw new UnauthorizedException('Tipo de token inválido')

    const processor = new BearerTokenProcessor(this.jwtService, token)

    if (!processor.isBearerToken()) throw new UnauthorizedException('Token inválido')
    if (!processor.isSignatureValid())
      throw new UnauthorizedException('Assinatura inválida ou token expirado')

    const userEntity = await this.userRepository.findOne({
      where: {
        id: processor?.payload?.id,
        email: processor?.payload?.email,
        cpf: processor?.payload?.cpf,
      },
    })

    if (!userEntity) throw new UnauthorizedException('Usuário não encontrado')

    return new TokenPayloadDTO(userEntity.id, userEntity.email, userEntity.cpf)
  }
}
