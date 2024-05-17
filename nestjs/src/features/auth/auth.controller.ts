import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login, Register } from './auth.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  register(@Body() body: Register) {
    return this.authService.register(body);
  }

  @Public()
  @Post()
  login(@Body() body: Login) {
    return this.authService.login(body);
  }
}
