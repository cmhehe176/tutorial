import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Login, Register } from './auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from 'src/database/entities/admin.entity';
import { Repository } from 'typeorm';
import { USER_NOT_FOUND } from 'src/common/error';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AdminEntity)
    private admin_db: Repository<AdminEntity>,
    private config: ConfigService,
  ) {}
  register = async (data: Register) => {
    const user = await this.admin_db.findOneBy({ email: data.email });
    if (user)
      throw new HttpException(
        { message: 'User is exist ' },
        HttpStatus.BAD_REQUEST,
      );

    //asynchronous
    const salt = bcrypt.genSaltSync(+this.config.get('SALT'));
    const hashPassword = bcrypt.hashSync(data.password, salt);
    //or
    //const hashPassword = bcrypt.hash(data.password,10) => fast

    await this.admin_db.insert({ ...data, password: hashPassword });

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

    const verify = bcrypt.compareSync(data.password, user.password);
    if (!verify)
      throw new HttpException(
        { message: USER_NOT_FOUND },
        HttpStatus.UNAUTHORIZED,
      );

    return 'hehe';
  };
}
