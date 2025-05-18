import { Injectable } from '@nestjs/common'
import { AddressRepository } from 'src/address/address.repository'
import { CompanyRepository } from './company.repository'
import { CreateCompanyDTO } from './dtos/create-company.dto'
import { AddressEntity } from 'src/address/address.entity'
import { UserRepository } from 'src/user/user.repository'

@Injectable()
export class CompanyService {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly addressRepository: AddressRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async create(createCompanyDto: CreateCompanyDTO) {
    let address: AddressEntity
    const user = await this.userRepository.findOneOrFail({
      where: { id: createCompanyDto.userId },
      relations: ['address'],
    })

    if (createCompanyDto.address) {
      address = this.addressRepository.create(createCompanyDto.address)
      await this.addressRepository.save(address)
    } else {
      address = user?.address
    }

    const newCompany = this.companyRepository.create({
      ...createCompanyDto,
      userOwner: user,
      users: [user],
      address,
    })
    await this.companyRepository.save(newCompany)
    await this.userRepository.update(user.id, { company: newCompany })

    return newCompany
  }
}
