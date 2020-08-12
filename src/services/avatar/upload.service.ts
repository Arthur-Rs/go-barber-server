import { getRepository } from 'typeorm'
import User from '../../entities/user.entity'
import AppError from '../../errors/app.error'

interface Request {
  userId: string
  file: string
}

class UploadAvatar {
  public async execute({ file, userId }: Request): Promise<void> {
    const repository = getRepository(User)

    // => Checking if user exist

    const user = await repository.findOne({ where: { id: userId } })

    if (!user) {
      throw new AppError('This user not exist', 400)
    }

    // Saving user in database

    user.avatarPath = file
    await repository.save(user)
  }
}

export default new UploadAvatar()
