import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
  ManyToOne,
  JoinColumn,
} from 'typeorm'

import User from './user.entity'
import IUserToken from '@modules/users/entities/user_token_entity.interface'

@Entity('user_tokens')
class UserToken implements IUserToken {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  @Generated('uuid')
  token: string

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User)
  user: User

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}

export default UserToken
