import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
} from 'typeorm'
import { ChatEntity } from 'src/chat/chat.entity'
import { UserEntity } from 'src/user/user.entity'

@Entity('messages')
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  content: string

  @ManyToOne(() => ChatEntity, (chat) => chat.messages, { nullable: false })
  @JoinColumn({ name: 'chat_id' })
  chat: ChatEntity

  @ManyToOne(() => UserEntity, (user) => user.id, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at?: Date

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at?: Date
}
