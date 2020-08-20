import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/app.error'
import IUserRepository from '@modules/users/repositories/user_repository.interface'
import IDeleteUser from '@modules/users/dtos/delete_user.dto'
import IHashPasssword from '../utils/password_hash/model/password_hash.interface'

@injectable()
class DeleteUser {
  constructor(
    @inject('UserRepository')
    private repository: IUserRepository,

    @inject('Hash')
    private hash: IHashPasssword
  ) {}

  public async execute({ password, id }: IDeleteUser): Promise<void> {
    const user = await this.repository.findById(id)

    if (!user) {
      throw new AppError('This user not exist', 400)
    }

    if (!(await this.hash.compareHash(password, user.password))) {
      throw new AppError('Incorrect Credentials', 401)
    }

    await this.repository.remove(id)
  }
}

export default DeleteUser
