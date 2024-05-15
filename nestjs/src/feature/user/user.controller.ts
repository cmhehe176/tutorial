import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './ user.dto';

@Controller('user')
export class UserController {
	constructor(
		private userService: UserService
	) { }
	
	@Post()
	create(@Body() body: CreateUserDto) {
		return this.userService.create(body)
	}

	@Get(':id') 
	get(@Param('id', ParseIntPipe) id: number) {
		return this.userService.get(id)
	}
}
