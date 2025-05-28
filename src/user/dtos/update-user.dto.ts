import { UpdateAddressDTO } from 'src/address/dtos/update-address.dto'

export type UpdateUserDTO = {
  name: string
  email: string
  password: string
  cpf: string
  phone: string
  skill?: string
  area?: string
  biography?: string
  birthdate: string
  address: UpdateAddressDTO
}
