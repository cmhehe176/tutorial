import { BaseEntity } from '../base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'admins' })
export class AdminEntity extends BaseEntity {
  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'email', type: 'varchar' })
  email: string;

  @Column({ name: 'password', type: 'varchar' })
  password: string;

  @Column({ name: 'role', type: 'varchar' })
  role: string
}
