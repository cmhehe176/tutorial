import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { AdminEntity } from './admin.entity';

@Entity({ name: 'role' })
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  // @Column({ unique: true })
  // alias: string;

  @OneToMany(() => UserEntity, (user) => user.roleId)
  userId?: UserEntity[];

  @OneToMany(() => AdminEntity, (admin) => admin.roleId)
  adminId?: AdminEntity[];
}
