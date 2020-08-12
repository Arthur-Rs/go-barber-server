import { getRepository } from 'typeorm'
import AppError from '../../errors/app.error'
import User from '../../entities/user.entity'
import { compare } from 'bcrypt'

interface Request {
  id: string
  password: string
}

class DeleteUser {
  public async execute({ password, id }: Request): Promise<void> {
    const repository = getRepository(User)

    // => Checking if the user exists

    const user = await repository.findOne({ where: { id } })

    if (!user) {
      throw new AppError('Incorrect Credentials', 401)
    }

    if (!(await compare(password, user.password))) {
      throw new AppError('Incorrect Credentials', 401)
    }

    // Deleting user from database

    await repository.remove(user)
  }
}

export default new DeleteUser()
