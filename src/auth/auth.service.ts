import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { TokenPayloadDTO } from './dtos/token.payload.dto'
import { UserRepository } from '../user/user.repository'
import { UserEntity } from 'src/user/user.entity'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async generateToken(user: UserEntity): Promise<string> {
    return this.jwtService.sign(
      {
        payload: new TokenPayloadDTO(user.id, user.email, user.cpf),
      },
      { secret: process.env.JWT_SECRET },
    )
  }

  async validateUser(email: string, password: string): Promise<UserEntity | null> {
    const user = await this.userRepository.findOne({ where: { email: email } })

    if (user && bcrypt.compareSync(password, user.password)) {
      return user
    }

    return null
  }
}
