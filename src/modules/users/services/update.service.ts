import 'reflect-metadata'
import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/app.error'
import IUserRepository from '@modules/users/repositories/user_repository.interface'
import IUpdateUser from '@modules/users/dtos/update_user.dto'
import IHashPasssword from '../utils/password_hash/model/password_hash.interface'
import IUser from '../entities/user_entity.interface'

@injectable()
class DeleteUser {
  constructor(
    @inject('UserRepository')
    private repository: IUserRepository,

    @inject('Hash')
    private hash: IHashPasssword
  ) {}

  public async execute(data: IUpdateUser): Promise<IUser> {
    const { id, email, name, password, currentPassword } = data

    const user = await this.repository.findById(id)

    if (!user) {
      throw new AppError('This User not exist', 400)
    }

    if (email) {
      const checkingEmail = await this.repository.findByEmail(email)

      if (checkingEmail) {
        throw new AppError('This user already exists', 400)
      }
    }

    if (currentPassword && password) {
      if (!(await this.hash.compareHash(currentPassword, user.password))) {
        throw new AppError('Incorrect Credentials', 401)
      }

      user.password = await this.hash.generateHash(password)
    }

    Object.assign(user, { name: name && name, email: email && email })

    await this.repository.save(user)

    return user
  }
}

export default DeleteUser
