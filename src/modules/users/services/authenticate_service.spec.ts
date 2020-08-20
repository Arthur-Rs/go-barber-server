import 'dotenv/config'
import FakeUserRepository from '../repositories/fakes/user_repository.fake'

import CreateUserService from './create.service'
import AuthenticateService from './authenticate.service'

import CreateUserDTO from '../dtos/create_user.dto'
import AuthenticateDTO from '../dtos/authenticate.dto'
import AppError from '@shared/errors/app.error'

import FakeHashPassword from '../utils/password_hash/fakes/password_hash.fake'

describe('Authenticate User', () => {
  it('Should be able to authenticate', async () => {
    const user: CreateUserDTO = {
      name: 'Arthur',
      email: 'arthur@gmail.com',
      password: '12345678',
    }

    const userCredentials: AuthenticateDTO = {
      email: 'arthur@gmail.com',
      password: '12345678',
    }

    const fakeUserRepository = new FakeUserRepository()
    const fakeHashPassword = new FakeHashPassword()

    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashPassword
    )
    const authenticateService = new AuthenticateService(
      fakeUserRepository,
      fakeHashPassword
    )

    await createUserService.execute(user)

    const tokenAndUser = await authenticateService.execute(userCredentials)

    expect(tokenAndUser).toHaveProperty('token')
    expect(tokenAndUser).toHaveProperty('user')
  })

  it('Must not be able to authenticate with the incorrect password', async () => {
    const user: CreateUserDTO = {
      name: 'Arthur',
      email: 'arthur@gmail.com',
      password: '12345678',
    }

    const userCredentials: AuthenticateDTO = {
      email: 'arthur@gmail.com',
      password: '12345679',
    }

    const fakeUserRepository = new FakeUserRepository()
    const fakeHashPassword = new FakeHashPassword()

    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashPassword
    )
    const authenticateService = new AuthenticateService(
      fakeUserRepository,
      fakeHashPassword
    )

    await createUserService.execute(user)

    expect(authenticateService.execute(userCredentials)).rejects.toBeInstanceOf(
      AppError
    )
  })

  it('Must not be able to authenticate with the incorrect email', async () => {
    const user: CreateUserDTO = {
      name: 'Arthur',
      email: 'arthur@gmail.com',
      password: '12345678',
    }

    const userCredentials: AuthenticateDTO = {
      email: 'arthur023@gmail.com',
      password: '12345678',
    }

    const fakeUserRepository = new FakeUserRepository()
    const fakeHashPassword = new FakeHashPassword()

    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashPassword
    )
    const authenticateService = new AuthenticateService(
      fakeUserRepository,
      fakeHashPassword
    )

    await createUserService.execute(user)

    expect(authenticateService.execute(userCredentials)).rejects.toBeInstanceOf(
      AppError
    )
  })
})
