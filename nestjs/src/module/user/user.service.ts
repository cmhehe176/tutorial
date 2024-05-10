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
		private dataSource: DataSource
	) { }
	
	async create(body: CreateUserDto) {
		const user = await this.userEntity.insert(body)
		return user
	}

}
