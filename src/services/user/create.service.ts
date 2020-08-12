import { getRepository } from 'typeorm'
import AppError from '../../errors/app.error'
import { uuid } from 'uuidv4'
import User from '../../entities/user.entity'
import { hash } from 'bcrypt'

interface Request {
  name: string
  email: string
  password: string
}

class CreateUser {
  public async execute({ name, email, password }: Request): Promise<User> {
    const repository = getRepository(User)

    // => Checking if the user already exists

    const checkExistingUser = await repository.findOne({ where: { email } })

    if (checkExistingUser) {
      throw new AppError('This user already exists', 400)
    }

    // => Create password Hash

    const passwordHash = await hash(password, 8)

    // => Saving to the database

    const newUser = repository.create({
      id: uuid(),
      name,
      email,
      password: passwordHash,
    })

    await repository.save(newUser)

    // => Returning new user

    delete newUser.password
    return newUser
  }
}

export default new CreateUser()
