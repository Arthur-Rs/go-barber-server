import IUser from '../entities/user_entity.interface'
import ICreateUserfrom from '../dtos/create_user.dto'

export default interface IUserRepository {
  findByEmail(email: string): Promise<IUser | undefined>
  showAllProviders(expectUserId: string): Promise<IUser[]>
  create(data: ICreateUserfrom): Promise<Omit<IUser, 'password'>>
  remove(id: string): Promise<void>
  findById(id: string): Promise<IUser | undefined>
  save(data: IUser): Promise<IUser | Omit<IUser, 'password'>>
}
