import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
} from 'typeorm'
import { UserEntity } from 'src/user/user.entity'
import { CompanyEntity } from 'src/company/company.entity'
import { MessageEntity } from 'src/message/message.entity'

@Entity('chats')
export class ChatEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  name: string

  @ManyToOne(() => UserEntity, (user) => user.id, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity

  @ManyToOne(() => CompanyEntity, (company) => company.id, { nullable: false })
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity

  @OneToMany(() => MessageEntity, (message) => message.chat)
  messages: MessageEntity[]

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at?: Date

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at?: Date
}
