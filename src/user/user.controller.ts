import { Controller, Post, Body, HttpStatus, Get } from '@nestjs/common'
import { Auth } from 'src/auth/auth.decorator'
import { CreateUserDTO } from './dtos/create-user.dto'
import { UserService } from './user.service'
import { ResponseHelper } from 'src/common/utils/response.helper'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth(false)
  @Post()
  async create(@Body() body: CreateUserDTO) {
    const user = await this.userService.create(body)

    return ResponseHelper.formatResponse(HttpStatus.CREATED, 'User successfully created', user)
  }

  @Get(':id')
  async getUser(@Body('id') id: number) {
    const user = await this.userService.findOne(id)

    return ResponseHelper.formatResponse(HttpStatus.OK, 'User found', user)
  }
}
