import { CreateAddressDTO } from 'src/address/dtos/create-address.dto'

export type CreateUserDTO = {
  name: string
  email: string
  password: string
  cpf: string
  phone: string
  skill?: string
  area?: string
  biography?: string
  birthdate: string
  address: CreateAddressDTO
}
