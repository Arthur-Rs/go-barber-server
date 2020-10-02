import 'dotenv/config'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import IUser from '@modules/users/entities/user_entity.interface'

import { Exclude, Expose } from 'class-transformer'

@Entity('users')
class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar')
  name: string

  @Column('varchar')
  email: string

  @Exclude()
  @Column('varchar')
  password: string

  @Column({ type: 'varchar', name: 'avatar_path', nullable: true })
  avatarPath?: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @Expose({ name: 'avatar_url' })
  avatarPathURL(): string | null {
    return this.avatarPath
      ? `${process.env.APP_WEB_URL}/files/${this.avatarPath}`
      : null
  }
}

export default User
