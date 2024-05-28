import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './ user.dto';
import { RegisterUser } from '../auth/auth.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private user_db: Repository<UserEntity>,
    private dataSource: DataSource,
  ) {}

  // insert không trả về giá trị
  async create(body: CreateUserDto) {
    // const user = {...body}  dùng như này thì nó sẽ không lấy được trường id
    const user = body;
    await this.user_db.insert(body);
    return user;
  }

  getUserbyEmail = async (email: string) => {
    return await this.user_db.findOneBy({ email });
  };

  createUser = async (data: RegisterUser) => {
    return await this.user_db.insert(data)
  }
}
