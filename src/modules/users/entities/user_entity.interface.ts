export default interface IUser {
  id: string

  name: string

  email: string

  password: string

  avatarPath?: string

  createdAt: Date

  updatedAt: Date
}
