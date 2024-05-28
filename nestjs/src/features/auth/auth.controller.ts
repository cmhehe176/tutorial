import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login, RegisterAdmin, RegisterUser } from './auth.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/register/admin')
  registerAdmin(@Body() body: RegisterAdmin) {
    console.log('asjfasdf')
    return this.authService.registerAdmin(body);
  }

  @Public()
  @Post('register/user')
  registerUser(@Body() body: RegisterUser) {
    return this.authService.registerUser(body);
  }

  @Public()
  @Post('login/:roleId')
  login(@Param('roleId', ParseIntPipe) roleId: number, @Body() body: Login) {
    return this.authService.login(roleId, body);
  }
}
