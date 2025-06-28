import { UpdateAddressDTO } from 'src/address/dtos/update-address.dto'

export type UpdateCompanyDTO = {
  name: string
  cnpj: string
  phone: string

  address?: UpdateAddressDTO & { id: number }
}
