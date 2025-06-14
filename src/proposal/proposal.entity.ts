import { CompanyEntity } from 'src/company/company.entity'
import { UserEntity } from 'src/user/user.entity'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm'

@Entity('projects')
export class ProposalEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  company_id: number

  @Column({ nullable: true })
  user_id: number

  @Column()
  title: string

  @Column('text')
  description: string

  @Column()
  value: string

  @Column({ type: 'timestamp' })
  final_date: Date

  @Column()
  skill_requested: string

  @Column()
  status: string

  @ManyToOne(() => CompanyEntity, (company) => company.proposals)
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity

  @ManyToOne(() => UserEntity, (user) => user.proposals)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  created_at: Date

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at: Date

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at: Date
}
