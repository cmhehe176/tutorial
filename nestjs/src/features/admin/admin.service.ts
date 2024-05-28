import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from 'src/database/entities';
import { Repository } from 'typeorm';
import { RegisterAdmin } from '../auth/auth.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private admin_db: Repository<AdminEntity>,
  ) {}

  getAdminbyEmail = async (email: string) => {
    return await this.admin_db.findOneBy({ email });
  };

  createAdmin = async (data: RegisterAdmin) => {
    return await this.admin_db.insert(data)
  }
}
