import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { AdminEntity } from './admin.entity';
import { BaseEntity } from '../base.entity';
import { SubjectEntity } from './subject.entity';
import { TimeEntity } from './time.entity';

@Entity({ name: 'class' })
export class ClassEntity extends BaseEntity {

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'descripton', type: 'text' })
  description: string

  @OneToOne(() => SubjectEntity)
  @JoinColumn({name:'subject_id'})
  subject: SubjectEntity

  @OneToOne(() => AdminEntity)
  @JoinColumn({name: 'admin_id'})
  adminId: AdminEntity

  @OneToMany(() => UserEntity, (user) => user.classId)
  userId: UserEntity[];

  @ManyToOne('TimeEntity')
  @JoinColumn({ name: 'time_id' })
  timeId?: TimeEntity;

}
