import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { AuthGuard } from './auth/auth.guard'
import { APP_GUARD } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from './user/user.entity'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { UserModule } from './user/user.module'
import { AddressEntity } from './address/address.entity'
import { LoggerMiddleware } from './common/middleware/logger.middleware'
import { CompanyEntity } from './company/company.entity'
import { CompanyModule } from './company/company.module'
import { ProposalModule } from './proposal/proposal.module'
import { ProposalEntity } from './proposal/entities/proposal.entity'
import { ChatEntity } from './chat/chat.entity'
import { ChatModule } from './chat/chat.module'
import { MessageEntity } from './message/message.entity'
import { MessageModule } from './message/message.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [
          UserEntity,
          AddressEntity,
          CompanyEntity,
          ProposalEntity,
          ChatEntity,
          MessageEntity,
        ],
        logging: configService.get<boolean>('DB_DEBUG'),
      }),
    }),
    TypeOrmModule.forFeature([UserEntity, AddressEntity, CompanyEntity]),
    ChatModule,
    AuthModule,
    UserModule,
    MessageModule,
    CompanyModule,
    ProposalModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService, { provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
