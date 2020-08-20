import FakeUserRepository from './../../repositories/fakes/user_repository.fake'
import CreateUserService from './../create.service'
import CreateUserDTO from '../../dtos/create_user.dto'
import AppError from '@shared/errors/app.error'

import FakeHashPassword from './../../utils/password_hash/fakes/password_hash.fake'

describe('Create User Service', () => {
  it('Should be able to create new user', async () => {
    const userData: CreateUserDTO = {
      name: 'Arthur',
      email: 'arthur@gmail.com',
      password: '12345678',
    }

    const fakeHashPassword = new FakeHashPassword()
    const fakeUserRepository = new FakeUserRepository()

    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashPassword
    )

    const user = await createUserService.execute(userData)

    expect(user).toHaveProperty('id')
    expect(user.name).toBe('Arthur')
    expect(user.email).toBe('arthur@gmail.com')
  })

  it('Should not be able to create a new users with same email from another', async () => {
    const userData: CreateUserDTO = {
      name: 'Arthur',
      email: 'arthur@gmail.com',
      password: '12345678',
    }

    const fakeHashPassword = new FakeHashPassword()
    const fakeUserRepository = new FakeUserRepository()

    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashPassword
    )

    await createUserService.execute(userData)

    expect(createUserService.execute(userData)).rejects.toBeInstanceOf(AppError)
  })
})
