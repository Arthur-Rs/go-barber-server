import IUser from './user_entity.interface'

export default interface IUserToken {
  id: string

  token: string

  userId: string

  user?: IUser

  createdAt: Date

  updatedAt: Date
}
