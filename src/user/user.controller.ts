import { Controller, Post, Body, HttpStatus } from '@nestjs/common'
import { Auth } from 'src/auth/auth.decorator'
import { CreateUserDTO } from './dtos/create-user.dto'
import { UserService } from './user.service'
import { ResponseHelper } from 'src/common/utils/response.helper'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth(false)
  @Post()
  async login(@Body() body: CreateUserDTO) {
    const user = await this.userService.create(body)

    return ResponseHelper.formatResponse(HttpStatus.CREATED, 'User successfully created', user)
  }
}
