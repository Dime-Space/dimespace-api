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
import { Proposal } from './proposal/entities/proposal.entity' // não esqueça de importar a entidade!

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
        entities: [UserEntity, AddressEntity, CompanyEntity, Proposal], // adiciona Proposal aqui
        logging: configService.get<boolean>('DB_DEBUG'),
      }),
    }),
    TypeOrmModule.forFeature([UserEntity, AddressEntity, CompanyEntity]),

    AuthModule,
    UserModule,
    CompanyModule,
    ProposalModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtService,
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
