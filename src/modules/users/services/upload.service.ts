import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/app.error'
import IUserRepository from '@modules/users/repositories/user_repository.interface'
import IUploadAvatar from '@modules/users/dtos/upload_avatar.dto'

@injectable()
class UploadAvatar {
  constructor(
    @inject('UserRepository')
    private repository: IUserRepository
  ) {}

  public async execute({ file, userId }: IUploadAvatar): Promise<void> {
    const user = await this.repository.findById(userId)

    if (!user) {
      throw new AppError('This user not exist', 400)
    }

    user.avatarPath = file
    await this.repository.save(user)
  }
}

export default UploadAvatar
