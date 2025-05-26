import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AddressEntity } from 'src/address/address.entity'
import { AddressRepository } from 'src/address/address.repository'
import { CompanyEntity } from './company.entity'
import { CompanyService } from './company.service'
import { CompanyRepository } from './company.repository'
import { CompanyController } from './company.controller'
import { UserEntity } from 'src/user/user.entity'
import { UserRepository } from 'src/user/user.repository'

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity, AddressEntity, UserEntity])],
  providers: [CompanyRepository, UserRepository, AddressRepository, CompanyService],
  exports: [CompanyRepository],
  controllers: [CompanyController],
})
export class CompanyModule {}
