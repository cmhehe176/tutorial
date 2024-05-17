import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'roles' })
export class RoleEntity{
	
	@PrimaryGeneratedColumn()
	id:number

	@Column({ name: 'role', type: 'varchar' })
	role:string
}