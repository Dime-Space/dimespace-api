import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common'
import { AuthService } from './auth.service'
import { ResponseHelper } from 'src/common/utils/response.helper'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const { username, password } = body

    const user = await this.authService.validateUser(username, password)
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED)
    }

    const token = await this.authService.generateToken(user)
    return ResponseHelper.formatResponse(HttpStatus.CREATED, 'User successfully logged in', {
      access_token: token,
    })
  }
}
