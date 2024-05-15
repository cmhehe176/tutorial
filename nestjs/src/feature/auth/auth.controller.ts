import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login, Register } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  register(@Body() body: Register) {
    return this.authService.register(body);
  }

  @Post()
  login(@Body() body: Login) {
    return this.authService.login(body);
  }
}
