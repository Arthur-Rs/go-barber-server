import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/app.error'
import IUserRepository from '@modules/users/repositories/user_repository.interface'
import IUploadAvatar from '@modules/users/dtos/upload_avatar.dto'
import IStorage from '@shared/utils/storange/models/storange.interface'
import IUser from '../entities/user_entity.interface'

@injectable()
class UploadAvatar {
  constructor(
    @inject('UserRepository')
    private repository: IUserRepository,

    @inject('Storage')
    private Storage: IStorage
  ) {}

  public async execute({ file, userId }: IUploadAvatar): Promise<IUser> {
    const user = await this.repository.findById(userId)

    if (!user) {
      throw new AppError('This user not exist', 400)
    }

    if (user.avatarPath) {
      await this.Storage.deleteFile(user.avatarPath)
    }

    const filename = await this.Storage.saveFile(file)

    user.avatarPath = filename

    await this.repository.save(user)

    return user
  }
}

export default UploadAvatar
