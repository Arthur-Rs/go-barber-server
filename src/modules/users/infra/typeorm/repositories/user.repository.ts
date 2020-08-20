import { getRepository } from 'typeorm'
import { uuid } from 'uuidv4'
import { hash } from 'bcrypt'

import User from '@modules/users/infra/typeorm/entities/user.entity'
import IUserRepository from '@modules/users/repositories/user_repository.interface'
import ICreateUser from '@modules/users/dtos/create_user.dto'

class UserInterface implements IUserRepository {
  public async findByEmail(email: string): Promise<User | undefined> {
    const repository = getRepository(User)
    const user = await repository.findOne({ where: { email } })
    return user
  }

  public async create(data: ICreateUser): Promise<Omit<User, 'password'>> {
    const repository = getRepository(User)
    const { email, name, password } = data
    const passwordHash = await hash(password, 8)
    const newUser = repository.create({
      id: uuid(),
      email,
      name,
      password: passwordHash,
    })
    await repository.save(newUser)
    delete newUser.password
    return newUser
  }

  public async findById(id: string): Promise<User | undefined> {
    const repository = getRepository(User)
    const user = await repository.findOne({ where: { id } })
    return user
  }

  public async remove(id: string): Promise<void> {
    const repository = getRepository(User)
    const newUser = this.findById(id)
    newUser && (await repository.remove((newUser as unknown) as User))
  }

  public async save(data: User): Promise<Omit<User, 'password'>> {
    const repository = getRepository(User)
    const user = await repository.save(data)
    delete user.password
    return user
  }
}

export default UserInterface
