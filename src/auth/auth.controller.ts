import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common'
import { AuthService } from './auth.service'
import { ResponseHelper } from 'src/common/utils/response.helper'
import { Auth } from './auth.decorator'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Auth(false)
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const { email: email, password } = body

    const user = await this.authService.validateUser(email, password)
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED)
    }

    const token = await this.authService.generateToken(user)
    return ResponseHelper.formatResponse(HttpStatus.CREATED, 'User successfully logged in', {
      access_token: token,
    })
  }
}
