import {
	Column,
	CreateDateColumn,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	DeleteDateColumn,
} from 'typeorm';

export class BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@Column({ type: 'int', name: 'created_id', nullable: true, select: false })
	createdId: number | null;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;

	@Column({ type: 'int', name: 'deleted_id', nullable: true, select: false })
	deletedId: number | null;

	@DeleteDateColumn({ name: 'deleted_at', select: false })
	deletedAt: Date;

}
