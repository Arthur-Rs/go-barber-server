import 'reflect-metadata'
import { inject, injectable } from 'tsyringe'

import IUserRepository from '@modules/users/repositories/user_repository.interface'
import IUser from '@modules/users/entities/user_entity.interface'
import ShowAllProvidersDTO from '../dtos/show_all_providers.dto'
import ICache from '@shared/utils/cache/models/cache.interface'

@injectable()
class DeleteUser {
  constructor(
    @inject('UserRepository')
    private repository: IUserRepository,

    @inject('Cache')
    private cache: ICache
  ) {}

  public async execute({ expectId }: ShowAllProvidersDTO): Promise<IUser[]> {
    let providers = await this.cache.recover<IUser[]>(
      `list-providers:${expectId}`
    )

    if (!providers) {
      providers = await this.repository.showAllProviders(expectId)
      this.cache.save(`list-providers:${expectId}`, providers)
    }

    return providers
  }
}

export default DeleteUser
