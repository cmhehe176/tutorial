import { Injectable } from '@nestjs/common';
import { Login } from './auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from 'src/database/entities/admin.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AdminEntity)
    private admin_db: Repository<AdminEntity>,
  ) {}
  login = async (data: Login) => {
    const { email } = data;
    const d = await this.admin_db.findOneBy({ email });
  };
}
