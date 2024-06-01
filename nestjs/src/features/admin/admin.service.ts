import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    return await this.admin_db.insert(data);
  }; 

  deleteUser = async (id: number) => {
    const user = await this.admin_db.findOneById(id)

    if (!user)
      throw new HttpException(
        { message: 'Account is not exist ' },
        HttpStatus.BAD_REQUEST,
      );
    
    await this.admin_db.softDelete(id)
    return { message : "success" }
  }
}
