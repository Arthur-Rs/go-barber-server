import FakeUserRepository from '../../repositories/fakes/user_repository.fake'

import CreateUserService from './../create.service'
import DeleteUserService from './../delete.service'
import FindUserService from './../find.service'

import CreateUserDTO from '../../dtos/create_user.dto'

import FakeHashPassword from '../../utils/password_hash/fakes/password_hash.fake'

import AppError from '@shared/errors/app.error'

describe('Delete User Service', () => {
  it('should be able to delete the user', async () => {
    const fakeUserRepository = new FakeUserRepository()

    const fakeHashPassword = new FakeHashPassword()
    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashPassword
    )
    const deleteUserService = new DeleteUserService(
      fakeUserRepository,
      fakeHashPassword
    )
    const findUserServide = new FindUserService(fakeUserRepository)

    const userData: CreateUserDTO = {
      name: 'Arthur',
      email: 'arthur@gmail.com',
      password: '12345678',
    }

    const user = await createUserService.execute(userData)

    expect(user).toHaveProperty('id')

    const { id } = user

    await deleteUserService.execute({ id, password: '12345678' })

    expect(findUserServide.execute(id)).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able delete the user with the incorrect password', async () => {
    const fakeUserRepository = new FakeUserRepository()

    const fakeHashPassword = new FakeHashPassword()

    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashPassword
    )
    const deleteUserService = new DeleteUserService(
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
      deleteUserService.execute({ id, password: '123' })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to delete the nonexistent user', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeHashPassword = new FakeHashPassword()

    const deleteUserService = new DeleteUserService(
      fakeUserRepository,
      fakeHashPassword
    )

    expect(
      deleteUserService.execute({ id: '123', password: '123' })
    ).rejects.toBeInstanceOf(AppError)
  })
})
