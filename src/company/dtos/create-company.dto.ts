import { CreateAddressDTO } from 'src/address/dtos/create-address.dto'

export type CreateCompanyDTO = {
  userId: number

  name: string
  cnpj: string
  phone: string

  address?: CreateAddressDTO
}
