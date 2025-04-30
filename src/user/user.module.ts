import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from './user.entity'
import { UserRepository } from './user.repository'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { AddressEntity } from 'src/address/address.entity'
import { AddressRepository } from 'src/address/address.repository'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, AddressEntity])],
  providers: [UserRepository, AddressRepository, UserService],
  exports: [UserRepository],
  controllers: [UserController],
})
export class UserModule {}
