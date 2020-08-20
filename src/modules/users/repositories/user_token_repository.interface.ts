import IUserToken from '../entities/user_token_entity.interface'

export default interface IUserTokenRepository {
  generate(userId: string): Promise<IUserToken>
  findByToken(token: string): Promise<IUserToken | undefined>
}
