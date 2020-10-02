import { container } from 'tsyringe'

import IHashPassword from '../utils/password_hash/model/password_hash.interface'
import Bcrypt from '../utils/password_hash/implementations/bcrypt'

import IUserRepository from '@modules/users/repositories/user_repository.interface'
import UserRepository from '@modules/users/infra/typeorm/repositories/user.repository'

import IUserTokenRepository from '@modules/users/repositories/user_token_repository.interface'
import UserTokenRepository from '@modules/users/infra/typeorm/repositories/user_token.repository'

container.registerSingleton<IHashPassword>('Hash', Bcrypt)

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)

container.registerSingleton<IUserTokenRepository>(
  'UserTokenRepository',
  UserTokenRepository
)
