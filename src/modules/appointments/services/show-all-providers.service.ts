import 'reflect-metadata'
import { inject, injectable } from 'tsyringe'

import IUserRepository from '@modules/users/repositories/user_repository.interface'
import IUser from '@modules/users/entities/user_entity.interface'
import ShowAllProvidersDTO from '../dtos/show_all_providers.dto'

@injectable()
class DeleteUser {
  constructor(
    @inject('UserRepository')
    private repository: IUserRepository
  ) {}

  public async execute({ expectId }: ShowAllProvidersDTO): Promise<IUser[]> {
    const providers = await this.repository.showAllProviders(expectId)
    return providers
  }
}

export default DeleteUser
