
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('projects') // nome da tabela no banco
export class Proposal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  company_id: number;

  @Column({ nullable: true })
  user_id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  value: string;

  @Column({ type: 'timestamp' })
  final_date: Date;

  @Column()
  skill_requested: string;

  @Column()
  status: string;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at: Date;
}
