import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { Reflector } from '@nestjs/core'
import { AuthService } from './auth.service'
import { PrismaService } from 'src/prisma/prisma.service'

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [AuthService, PrismaService, Reflector],
  controllers: [AuthController],
})
export class AuthModule {}
