import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Login, Register } from './auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from 'src/database/entities/admin.entity';
import { Repository } from 'typeorm';
import { USER_NOT_FOUND } from 'src/common/error';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AdminEntity)
    private admin_db: Repository<AdminEntity>,
    private config: ConfigService,
    private jwtService: JwtService
  ) {}
  register = async (data: Register) => {
    const user = await this.admin_db.findOneBy({ email: data.email });
    if (user)
      throw new HttpException(
        { message: 'User is exist ' },
        HttpStatus.BAD_REQUEST,
      );

    data.password = this.hash(data.password);
    await this.admin_db.insert(data);

    delete data.password;
    return data;
  };

  login = async (data: Login) => {
    const user = await this.admin_db.findOneBy({ email: data.email });
    if (!user)
      throw new HttpException(
        { message: USER_NOT_FOUND },
        HttpStatus.UNAUTHORIZED,
      );

    if (!this.compare(data.password,user.password))
      throw new HttpException(
        { message: USER_NOT_FOUND },
        HttpStatus.UNAUTHORIZED,
      );
    
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email
    }

    return {
      accesToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload)
    }
  };

  hash = (password) => {
    //asynchronous => dùng hashSync hoặc có thể dùng await ở đây cũng được
    const salt = bcrypt.genSaltSync(+this.config.get('SALT'));
    const hashPassword = bcrypt.hashSync(password, salt);
    //or
    //const hashPassword = bcrypt.hash(data.password,10) => fast
    return hashPassword
  }
  
  compare = (password, hashpassword) => {
    return bcrypt.compareSync(password,hashpassword)
  }
}
