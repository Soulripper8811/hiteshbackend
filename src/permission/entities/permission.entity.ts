import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Module } from 'src/modules/entities/module.entity'; // Ensure correct import path
import { Role } from 'src/roles/entities/role.entity';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Define one-to-one relationship with the Module entity
  @OneToOne(() => Module, { nullable: false })
  @JoinColumn({ name: 'module_id' })
  module: Module;

  @Column({ default: true })
  can_read: boolean;

  @Column({ default: true })
  can_add: boolean;

  @Column({ default: true })
  can_edit: boolean;

  @Column({ default: true })
  can_delete: boolean;

  // Many-to-one relationship with the Role entity
  @ManyToOne(() => Role, (role) => role.permissions, { nullable: false })
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
