import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { PrismaService } from 'src/prisma/prisma.service'
import { User } from 'generated/prisma'
import { TokenPayloadDTO } from './dtos/token.payload.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async generateToken(user: User): Promise<string> {
    return this.jwtService.sign(
      {
        payload: new TokenPayloadDTO(user.id, user.email, user.cpf),
      },
      { secret: process.env.JWT_SECRET },
    )
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({ where: { email: email } })

    if (user && bcrypt.compareSync(password, user.password)) {
      return user
    }

    return null
  }
}
