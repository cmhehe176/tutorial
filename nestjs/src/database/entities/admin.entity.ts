import { BaseEntity } from "../base.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'admins'})
export class AdminEntity extends BaseEntity {

	@Column({ name: 'name', type: 'varchar' })
	name: string
	
	@Column({ name: 'password', type: 'varchar' })
	password: string
	
}