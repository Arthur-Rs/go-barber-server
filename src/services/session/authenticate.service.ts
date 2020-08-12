import User from '../../entities/user.entity'
import { getRepository } from 'typeorm'
import AppError from '../../errors/app.error'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

interface Request {
  email: string
  password: string
}

interface Response {
  token: string
}

class Authenticate {
  public async execute({ email, password }: Request): Promise<Response> {
    const repository = getRepository(User)

    // => Checking if the user exists

    const user = await repository.findOne({ where: { email } })

    if (!user) {
      throw new AppError('Incorrect Credentials', 401)
    }

    // => Checking password

    if (!(await compare(password, user.password))) {
      throw new AppError('Incorrect Credentials', 401)
    }

    // => Create token

    const secret = process.env.JWT_PASS as string
    const expiresIn = process.env.JWT_TIME as string
    const { id } = user
    const token = sign({ id }, secret, {
      expiresIn,
    })

    return { token }
  }
}

export default new Authenticate()
