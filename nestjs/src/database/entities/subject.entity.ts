import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ClassEntity } from './class.entity';
import { BaseEntity } from '../base.entity';

@Entity({ name: 'subjects' })
export class SubjectEntity extends BaseEntity{

	@Column({ name: 'name', type: 'varchar' })
	name: string;

	@Column({ name: 'descripton', type: 'text' })
	description: string

	@OneToOne(() => ClassEntity)
	@JoinColumn({name:'class_id'})
	class: ClassEntity
}
