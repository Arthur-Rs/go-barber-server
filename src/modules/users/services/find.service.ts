import { inject, injectable } from 'tsyringe'

import IUserRepository from '@modules/users/repositories/user_repository.interface'
import IUser from '../entities/user_entity.interface'
import AppError from '@shared/errors/app.error'

@injectable()
class DeleteUser {
  constructor(
    @inject('UserRepository')
    private repository: IUserRepository
  ) {}

  public async execute(id: string): Promise<IUser> {
    const user = await this.repository.findById(id)

    if (!user) {
      throw new AppError('Incorrect Credentials', 401)
    }

    return user
  }
}

export default DeleteUser
