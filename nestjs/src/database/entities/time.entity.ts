import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { AdminEntity } from './admin.entity';
import { ClassEntity } from './class.entity';
import { BaseEntity } from '../base.entity';

@Entity({ name: 'times' })
export class TimeEntity extends BaseEntity {

	@Column({ name: 'name', type: 'varchar' })
	name: string;
	
	@Column({ name: 'start_time', type: 'timestamp' })
	startTime: Date

	@Column({ name: 'end_time', type: 'timestamp' })
	endTime: Date
	
	@OneToMany(() => ClassEntity, (c) => c.timeId)
	classId?: ClassEntity[];
}
