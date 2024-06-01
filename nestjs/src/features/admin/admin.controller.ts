import { Controller, Delete, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
	constructor(private adminService: AdminService){}
	
	@Delete(':id')
	getUser(@Param('id', ParseIntPipe) id: number) {
		return this.adminService.deleteUser(id)
	}
}
