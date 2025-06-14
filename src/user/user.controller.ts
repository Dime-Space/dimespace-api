import { Controller, Post, Body, HttpStatus, Get, Param, Patch, Delete } from '@nestjs/common'
import { Auth } from 'src/common/decorators/auth.decorator'
import { CreateUserDTO } from './dtos/create-user.dto'
import { UpdateUserDTO } from './dtos/update-user.dto'
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
  async getUser(@Param('id') id: number) {
    const user = await this.userService.findOne(id)
    return ResponseHelper.formatResponse(HttpStatus.OK, 'User found', user)
  }

  @Get()
  async getUsers() {
    const users = await this.userService.findAll()
    return ResponseHelper.formatResponse(HttpStatus.OK, 'Users found', users)
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() body: UpdateUserDTO) {
    const user = await this.userService.update(id, body)
    return ResponseHelper.formatResponse(HttpStatus.OK, 'User updated successfully', user)
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const result = await this.userService.remove(id)
    return ResponseHelper.formatResponse(HttpStatus.OK, 'User removed successfully', result)
  }
}
