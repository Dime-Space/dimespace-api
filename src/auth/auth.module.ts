import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { Reflector } from '@nestjs/core'
import { AuthService } from './auth.service'
import { UserRepository } from 'src/user/user.repository'
import { UserEntity } from 'src/user/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [UserRepository, AuthService, Reflector],
  controllers: [AuthController],
})
export class AuthModule {}
