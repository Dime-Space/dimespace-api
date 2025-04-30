import { AddressEntity } from 'src/address/address.entity'
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
// import { CompanyEntity } from './company.entity'
// import { ProjectEntity } from './project.entity'

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  password: string

  @Column()
  phone: string

  @Column()
  cpf: string

  @Column()
  email: string

  @Column({ nullable: true })
  skill?: string

  @Column({ nullable: true })
  area?: string

  @Column({ nullable: true })
  biography?: string

  @Column({ default: 0 })
  credits: number

  @Column({ nullable: true })
  image_key?: string

  @Column({ type: 'timestamp' })
  birthdate: Date

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at?: Date

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at?: Date

  @ManyToOne(() => AddressEntity, (address) => address.users, { nullable: false })
  @JoinColumn({ name: 'address_id' })
  address: AddressEntity

  // @ManyToOne(() => CompanyEntity, (company) => company.users)
  // company: CompanyEntity

  // @OneToMany(() => ProjectEntity, (project) => project.user)
  // projects: ProjectEntity[]

  // @OneToMany(() => CompanyEntity, (company) => company.user_owner)
  // ownedCompanies: CompanyEntity[]
}
