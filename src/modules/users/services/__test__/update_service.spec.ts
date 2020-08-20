import FakeUserRepository from '../../repositories/fakes/user_repository.fake'

import CreateUserService from '../create.service'
import UpdateUserService from '../update.service'

import CreateUserDTO from '../../dtos/create_user.dto'

import FakeHashPassword from '../../utils/password_hash/fakes/password_hash.fake'

import AppError from '@shared/errors/app.error'

describe('Update User Service', () => {
  it('should be able to update user data', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeHashPassword = new FakeHashPassword()

    const updateUserService = new UpdateUserService(
      fakeUserRepository,
      fakeHashPassword
    )

    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashPassword
    )

    const userData: CreateUserDTO = {
      name: 'Arthur',
      email: 'arthur@gmail.com',
      password: '12345678',
    }

    const user = await createUserService.execute(userData)

    expect(user).toHaveProperty('id')

    const { id } = user

    const updateEmailUser = await updateUserService.execute({
      id,
      email: 'joao@gmail.com',
    })

    expect(updateEmailUser.email).toEqual('joao@gmail.com')

    const updateNameUser = await updateUserService.execute({
      id,
      name: 'João',
    })

    expect(updateNameUser.name).toEqual('João')
  })

  it('should not be able to update a user is data if the password is incorrect', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeHashPassword = new FakeHashPassword()

    const updateUserService = new UpdateUserService(
      fakeUserRepository,
      fakeHashPassword
    )

    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashPassword
    )

    const userData: CreateUserDTO = {
      name: 'Arthur',
      email: 'arthur@gmail.com',
      password: '12345678',
    }

    const user = await createUserService.execute(userData)

    expect(user).toHaveProperty('id')

    const { id } = user

    expect(
      updateUserService.execute({
        id,
        password: '123456789',
        currentPassword: '123',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to update the password', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeHashPassword = new FakeHashPassword()

    const updateUserService = new UpdateUserService(
      fakeUserRepository,
      fakeHashPassword
    )

    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashPassword
    )

    const userData: CreateUserDTO = {
      name: 'Arthur',
      email: 'arthur@gmail.com',
      password: '12345678',
    }

    const user = await createUserService.execute(userData)

    expect(user).toHaveProperty('id')

    const { id } = user

    const updatedPasswordUser = await updateUserService.execute({
      id,
      password: '87654321',
      currentPassword: '12345678',
    })

    expect(updatedPasswordUser.password).toEqual('87654321')
  })

  it('Should not be able to update data from a non-existent user', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeHashPassword = new FakeHashPassword()

    const updateUserService = new UpdateUserService(
      fakeUserRepository,
      fakeHashPassword
    )

    expect(
      updateUserService.execute({ id: 'This user not exist' })
    ).rejects.toBeInstanceOf(AppError)
  })
})
