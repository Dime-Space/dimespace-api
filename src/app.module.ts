import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from './prisma/prisma.module'
import { AuthModule } from './auth/auth.module'
import { AuthGuard } from './auth/auth.guard'
import { APP_GUARD } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from './prisma/prisma.service'

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, JwtService, PrismaService, { provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
