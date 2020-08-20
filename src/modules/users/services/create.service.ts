import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/app.error'
import CreateUserDTO from '@modules/users/dtos/create_user.dto'
import IUser from '@modules/users/entities/user_entity.interface'
import IUserRepository from '@modules/users/repositories/user_repository.interface'
import IHashPasssword from '../utils/password_hash/model/password_hash.interface'

@injectable()
class CreateUser {
  constructor(
    @inject('UserRepository')
    private repository: IUserRepository,

    @inject('Hash')
    private hash: IHashPasssword
  ) {}

  public async execute(data: CreateUserDTO): Promise<Omit<IUser, 'password'>> {
    const { email, name, password } = data

    const checkExistingUser = await this.repository.findByEmail(email)

    if (checkExistingUser) {
      throw new AppError('This user already exists', 400)
    }

    const passwordHash = await this.hash.generateHash(password)

    const newUser = await this.repository.create({
      name,
      email,
      password: passwordHash,
    })

    return newUser
  }
}

export default CreateUser
