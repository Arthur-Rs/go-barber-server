import 'reflect-metadata'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import User from '@modules/users/infra/typeorm/entities/user.entity'
import AppError from '@shared/errors/app.error'
import AuthenticateDTO from '@modules/users/dtos/authenticate.dto'
import IUserRepository from '@modules/users/repositories/user_repository.interface'
import IHashPasssword from '../utils/password_hash/model/password_hash.interface'

interface Response {
  user: User
  token: string
}

@injectable()
class Authenticate {
  constructor(
    @inject('UserRepository')
    private repository: IUserRepository,

    @inject('Hash')
    private hash: IHashPasssword
  ) {}

  public async execute(data: AuthenticateDTO): Promise<Response> {
    const { email, password } = data

    const user = await this.repository.findByEmail(email)

    if (!user) {
      throw new AppError('Incorrect Credentials', 401)
    }

    if (!(await this.hash.compareHash(password, user.password))) {
      throw new AppError('Incorrect Credentials', 401)
    }

    const secret = process.env.JWT_PASS as string
    const expiresIn = process.env.JWT_TIME as string
    const { id } = user
    const token = sign({ id }, secret, {
      expiresIn,
    })

    delete user.password
    return { user, token }
  }
}

export default Authenticate
