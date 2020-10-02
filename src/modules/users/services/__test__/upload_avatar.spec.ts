import FakeUserRepository from '../../repositories/fakes/user_repository.fake'
import FakeStorage from '@shared/utils/storage/fakes/storage.fake'
import FakePasswordHash from '../../utils/password_hash/fakes/password_hash.fake'

import UploadAvatarService from '../upload.service'
import CreateUserService from '../create.service'

import AppError from '@shared/errors/app.error'

describe('Upload User Avatar Service', () => {
  it('should be able to upload avatar', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeStorage = new FakeStorage()
    const fakePasswordHash = new FakePasswordHash()

    const uploadAvatarService = new UploadAvatarService(
      fakeUserRepository,
      fakeStorage
    )

    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakePasswordHash
    )

    const user = await createUserService.execute({
      name: 'Arthur',
      email: 'arthur@gmail.com',
      password: '12346578',
    })

    await uploadAvatarService.execute({
      userId: user.id,
      file: 'image.jpg',
    })

    expect(user.avatarPath).toEqual('image.jpg')
  })

  it('should not be able to upload avatar', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeStorage = new FakeStorage()

    const uploadAvatarService = new UploadAvatarService(
      fakeUserRepository,
      fakeStorage
    )

    expect(
      uploadAvatarService.execute({
        userId: 'ThisUserNotExist',
        file: 'image.jpg',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be delete old avatar and add the new avatar', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeStorage = new FakeStorage()
    const fakePasswordHash = new FakePasswordHash()

    const deleteFile = jest.spyOn(fakeStorage, 'deleteFile')

    const uploadAvatarService = new UploadAvatarService(
      fakeUserRepository,
      fakeStorage
    )

    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakePasswordHash
    )

    const user = await createUserService.execute({
      name: 'Arthur',
      email: 'arthur@gmail.com',
      password: '12346578',
    })

    await uploadAvatarService.execute({
      userId: user.id,
      file: 'image.jpg',
    })

    await uploadAvatarService.execute({
      userId: user.id,
      file: 'image2.jpg',
    })

    expect(deleteFile).toBeCalledWith('image.jpg')
    expect(user.avatarPath).toEqual('image2.jpg')
  })
})
