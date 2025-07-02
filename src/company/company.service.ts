import { Injectable } from '@nestjs/common'
import { Like } from 'typeorm'
import { AddressRepository } from 'src/address/address.repository'
import { CompanyRepository } from './company.repository'
import { CreateCompanyDTO } from './dtos/create-company.dto'
import { AddressEntity } from 'src/address/address.entity'
import { UserRepository } from 'src/user/user.repository'
import { UpdateCompanyDTO } from './dtos/update-company,dto'
import { CompanyEntity } from './company.entity'

@Injectable()
export class CompanyService {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly addressRepository: AddressRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async findAll(): Promise<CompanyEntity[]> {
    return this.companyRepository.find()
  }

  async findById(companyId: number) {
    const company = await this.companyRepository.findOneOrFail({
      where: { id: companyId },
      relations: ['address'],
    })

    return company
  }

  async create(userId: number, createCompanyDto: CreateCompanyDTO) {
    let address: AddressEntity
    const user = await this.userRepository.findOneOrFail({
      where: { id: userId },
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

  async update(companyId: number, updateCompanyDto: UpdateCompanyDTO) {
    const company = await this.companyRepository.findOneOrFail({
      where: { id: companyId },
      relations: ['address'],
    })

    if (updateCompanyDto.address) {
      const address = await this.addressRepository.findOneOrFail({
        where: { id: updateCompanyDto.address.id },
      })
      Object.assign(address, updateCompanyDto.address)
      await this.addressRepository.save(address)
      company.address = address
    }

    Object.assign(company, updateCompanyDto)
    await this.companyRepository.save(company)

    return company
  }

  async delete(companyId: number) {
    const company = await this.companyRepository.findOneOrFail({
      where: { id: companyId },
    })

    await this.companyRepository.remove(company)
    return { message: 'Company successfully deleted' }
  }

  async findByName(name: string): Promise<CompanyEntity[]> {
    return await this.companyRepository.find({
      where: {
        name: Like(`%${name}%`),
      },
    })
  }
}
