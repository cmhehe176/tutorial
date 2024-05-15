import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Login } from './auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from 'src/database/entities/admin.entity';
import { Repository } from 'typeorm';
import { EMAIL_NOT_FOUND, USER_NOT_FOUND } from 'src/common/error';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AdminEntity)
    private admin_db: Repository<AdminEntity>,
  ) {}
  login = async (data: Login) => {
    const email = await this.admin_db.findOneBy({ email: data.email });

    if (!email)
      throw new HttpException(
        { message: USER_NOT_FOUND },
        HttpStatus.UNAUTHORIZED,
      );
  };
}
