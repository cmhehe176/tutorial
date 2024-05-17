import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthPayload } from '../interfaces/auth.interface';
import { DataSource } from 'typeorm';
import { AdminEntity } from 'src/database/entities/admin.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private readonly dataSource: DataSource,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, //kiểm tra hết hạn của token
      secretOrKey: configService.get<string>('JWT_SECRET_KEY'),
    });
  }
  //validate lần thứ 2 khi lúc này nó bắt bên fe phải đưa cho nó cái token , và nó phải validate cái token để mà tiếp tục đăng nhập vào tiếp
  // => nhả ra thông tin của user đăng nhập vào
  async validate(payload: AuthPayload) {
    const user = await this.dataSource.manager.findOne(AdminEntity, {
      where: { id: +payload.id },
      relations: { role: true },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
}
