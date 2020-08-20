import { getRepository } from 'typeorm'
import UserTokenEntity from '../entities/user_token.entity'

import IUserTokenRepository from '@modules/users/repositories/user_token_repository.interface'
import { uuid } from 'uuidv4'

class UserTokenRepository implements IUserTokenRepository {
  public async generate(userId: string): Promise<UserTokenEntity> {
    const repository = getRepository(UserTokenEntity)

    const userToken = repository.create({
      token: uuid(),
      userId,
    })

    await repository.save(userToken)

    return userToken
  }

  public async findByToken(
    token: string
  ): Promise<UserTokenEntity | undefined> {
    const repository = getRepository(UserTokenEntity)
    const userToken = await repository.findOne({ where: { token } })
    return userToken
  }
}

export default UserTokenRepository
