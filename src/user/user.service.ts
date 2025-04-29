import { Injectable } from '@nestjs/common'
import { UserRepository } from '../user/user.repository'
import { CreateUserDTO } from './dtos/create-user.dto'
import * as bcrypt from 'bcryptjs'
import { AddressRepository } from 'src/address/address.repository'

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly addressRepository: AddressRepository,
  ) {}

  async create(createUserDto: CreateUserDTO) {
    const password = bcrypt.hashSync(createUserDto.password, 10)

    const address = await this.addressRepository.create(createUserDto.address)
    await this.addressRepository.save(address)

    const user = await this.userRepository.create({ ...createUserDto, password, address })
    await this.userRepository.save(user)

    return user
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['address'],
    })

    if (!user) {
      throw new Error('User not found')
    }

    return user
  }
}
