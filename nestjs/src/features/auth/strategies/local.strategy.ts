import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { AdminEntity } from 'src/database/entities/admin.entity';
import { UserEntity } from 'src/database/entities';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }
  //validate lần đầu khi mà người dùng gửi request đăng nhập
  async validate(
    roleId: number,
    email: string,
    password: string,
  ): Promise<AdminEntity | UserEntity> {
    const user = await this.authService.verify(roleId, email, password);

    // có thể viết trong hàm verify luôn cũng được , hoặc là viết ở đây cũng được

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
