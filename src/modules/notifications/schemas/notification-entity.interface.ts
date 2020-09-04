import { ObjectID } from 'mongodb'

export default interface INotification {
  id?: ObjectID

  content?: string

  recipientID?: string

  read?: boolean

  createdAt?: Date

  updatedAt?: Date
}
