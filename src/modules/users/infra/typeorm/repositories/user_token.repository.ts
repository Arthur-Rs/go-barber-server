import { getRepository } from 'typeorm'
import { uuid } from 'uuidv4'

import UserToken from '../entities/user_token.entity'
import IUserTokenRepository from '@modules/users/repositories/user_token_repository.interface'

class UserTokenRepository implements IUserTokenRepository {
  public async generate(userId: string): Promise<UserToken> {
    const repository = getRepository(UserToken)

    const userToken = repository.create({
      token: uuid(),
      userId,
    })

    await repository.save(userToken)

    return userToken
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const repository = getRepository(UserToken)
    const userToken = await repository.findOne({ where: { token } })
    return userToken
  }
}

export default UserTokenRepository
