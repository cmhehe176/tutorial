import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'role' })
export class RoleEntity{
	
	@PrimaryGeneratedColumn()
	id:number

	@Column({ name: 'role', type: 'varchar' })
	name:string
}