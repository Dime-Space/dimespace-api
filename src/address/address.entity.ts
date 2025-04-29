import { UserEntity } from 'src/user/user.entity'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm'

@Entity('addresses')
export class AddressEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 8 })
  cep: string

  @Column({ length: 50 })
  state: string

  @Column({ length: 100 })
  city: string

  @Column({ length: 150 })
  street: string

  @Column({ length: 10 })
  number: string

  @Column({ length: 255, nullable: true })
  complement?: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @DeleteDateColumn({ nullable: true })
  deleted_at?: Date

  @OneToMany(() => UserEntity, (users) => users.address)
  users: UserEntity
}
