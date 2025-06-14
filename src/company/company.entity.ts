import { AddressEntity } from 'src/address/address.entity'
import { UserEntity } from 'src/user/user.entity'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm'

@Entity('companies')
export class CompanyEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  cnpj: string

  @Column()
  phone: string

  @Column()
  image_key: string

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at?: Date

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at?: Date

  @ManyToOne(() => AddressEntity, (address) => address.users, { nullable: false })
  @JoinColumn({ name: 'address_id' })
  address: AddressEntity

  @OneToMany(() => UserEntity, (user) => user.company)
  users: UserEntity[]

  @ManyToOne(() => UserEntity, (user) => user.ownedCompanies)
  @JoinColumn({ name: 'user_owner_id' })
  userOwner: UserEntity
}
