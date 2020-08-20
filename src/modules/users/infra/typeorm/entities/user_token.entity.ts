import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
} from 'typeorm'

@Entity('user_tokens')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('')
  @Generated('uuid')
  token: string

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}

export default User
