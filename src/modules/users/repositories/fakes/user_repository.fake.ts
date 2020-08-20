import { uuid } from 'uuidv4'

import User from '@modules/users/infra/typeorm/entities/user.entity'
import IUserRepository from '@modules/users/repositories/user_repository.interface'
import ICreateUser from '@modules/users/dtos/create_user.dto'

class UserInterface implements IUserRepository {
  private database: User[] = []

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.database.find((user) => user.email === email)
    return user
  }

  public async create(data: ICreateUser): Promise<User> {
    const { email, name, password } = data

    const newUser = new User()

    Object.assign(newUser, {
      id: uuid(),
      email,
      name,
      password,
    })

    this.database.push(newUser)

    return newUser
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.database.find((user) => user.id === id)
    return user
  }

  public async remove(id: string): Promise<void> {
    const index = this.database.findIndex((user) => user.id === id)
    this.database.splice(index, 1)
  }

  public async save(data: User): Promise<Omit<User, 'password'>> {
    const index = this.database.findIndex((user) => user.id === data.id)
    this.database[index] = data
    return this.database[index]
  }
}

export default UserInterface
