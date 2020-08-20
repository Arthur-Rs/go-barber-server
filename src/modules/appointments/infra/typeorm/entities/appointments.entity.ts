import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm'
import User from '@modules/users/infra/typeorm/entities/user.entity'

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('timestamp with time zone')
  date: Date

  @Column({ name: 'provider_id' })
  providerId: string

  @JoinColumn({ name: 'provider_id' })
  @ManyToOne(() => User)
  provider: User

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}

export default Appointment