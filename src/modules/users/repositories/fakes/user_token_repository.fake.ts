import { uuid } from 'uuidv4'

import IUserTokenRepository from '../user_token_repository.interface'
import IUserToken from '../../entities/user_token_entity.interface'

class FakeUserTokenRepository implements IUserTokenRepository {
  private database: IUserToken[] = []

  public async generate(userId: string): Promise<IUserToken> {
    const userToken: IUserToken = {
      id: uuid(),
      token: uuid(),
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.database.push(userToken)
    return userToken
  }

  public async findByToken(token: string): Promise<IUserToken | undefined> {
    const userToken = this.database.find(
      (userToken) => userToken.token === token
    )

    return userToken
  }
}

export default FakeUserTokenRepository
