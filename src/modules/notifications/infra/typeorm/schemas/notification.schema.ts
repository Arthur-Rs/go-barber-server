import {
  ObjectID,
  ObjectIdColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('notification')
class Notification {
  @ObjectIdColumn()
  id: ObjectID

  @Column('text')
  content: string

  @Column('uuid')
  recipientID: string

  @Column('boolean')
  read: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

export default Notification
