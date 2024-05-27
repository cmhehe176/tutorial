import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { RoleEntity } from './role.entity';
import { AdminEntity } from './admin.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'email', type: 'varchar' })
  email: string;

  @Column({ name: 'password', type: 'varchar' })
  password: string;

  @ManyToOne('RoleEntity')
  @JoinColumn({ name: 'role_id' })
  role?: RoleEntity;

  @ManyToOne('AdminEntity')
  @JoinColumn({ name: 'admin_id' })
  admin_id: AdminEntity;
}
