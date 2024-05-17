import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { AdminEntity } from 'src/database/entities/admin.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }
  //validate lần đầu khi mà người dùng gửi request đăng nhập
  async validate(email: string, password: string): Promise<AdminEntity> {
    const user = await this.authService.verify(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
