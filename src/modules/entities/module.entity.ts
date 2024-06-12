import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Module {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  module: string;

  @Column({ default: false })
  is_main: boolean;

  // Self-referencing one-to-one relationship
  @OneToOne(() => Module, { nullable: true })
  @JoinColumn({ referencedColumnName: 'id' })
  main_module: Module | null;

  @Column({ type: 'uuid', nullable: true })
  created_by: string; // UUID of the user who created this module

  @Column({ type: 'uuid', nullable: true })
  updated_by: string; // UUID of the user who last updated this module

  @CreateDateColumn()
  created_at: Date; // Automatically managed by TypeORM

  @UpdateDateColumn()
  updated_at: Date; // Automatically managed by TypeORM
}
