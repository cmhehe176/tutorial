import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './ user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userEntity: Repository<UserEntity>,
    private dataSource: DataSource,
  ) {}

  // insert không trả về giá trị

  async create(body: CreateUserDto) {
    // const user = {...body}  dùng như này thì nó sẽ không lấy được trường id
    const user = body;
    await this.userEntity.insert(body);
    return user;
  }

  get = async (id: number) => {
    return this.userEntity.findOneBy({ id });
  };
}
