import User from '@modules/users/infra/typeorm/entities/user.entity'

export default interface Appointment {
  id?: string

  date?: Date

  providerId?: string

  provider?: User

  userId?: string

  User?: User

  createdAt?: Date

  updatedAt?: Date
}
