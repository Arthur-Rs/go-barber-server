import { inject, injectable } from 'tsyringe'
import { differenceInMinutes } from 'date-fns'

import IUserRepository from '@modules/users/repositories/user_repository.interface'
import IUserTokenRepository from '@modules/users/repositories/user_token_repository.interface'
import IResetPassword from '../dtos/reset_password.dto'
import AppError from '@shared/errors/app.error'
import IHashPasssword from '../utils/password_hash/model/password_hash.interface'

@injectable()
class SendForgotPasswordMailService {
  constructor(
    @inject('UserRepository')
    private repository: IUserRepository,

    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,

    @inject('Hash')
    private hash: IHashPasssword
  ) {}

  public async execute(data: IResetPassword): Promise<void> {
    const { token, password } = data

    const userToken = await this.userTokenRepository.findByToken(token)

    if (!userToken) {
      throw new AppError('token does not exists', 400)
    }

    const { createdAt } = userToken

    const differenceTime = differenceInMinutes(Date.now(), createdAt)

    console.log(differenceTime)

    if (differenceTime > 30) {
      throw new AppError('Token expired', 401)
    }

    const user = await this.repository.findById(userToken.userId)

    if (!user) {
      throw new AppError('user does not exists', 400)
    }

    user.password = await this.hash.generateHash(password)

    await this.repository.save(user)
  }
}

export default SendForgotPasswordMailService
