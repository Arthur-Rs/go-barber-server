import FakeUserRepository from '../../repositories/fakes/user_repository.fake'

import CreateUserService from '../create.service'
import FindUserService from '../show.service'

import CreateUserDTO from '../../dtos/create_user.dto'

import FakeHashPassword from '../../utils/password_hash/fakes/password_hash.fake'

import AppError from '@shared/errors/app.error'

describe('Find User Service', () => {
  it('should be able to collect user data', async () => {
    const fakeUserRepository = new FakeUserRepository()

    const fakeHashPassword = new FakeHashPassword()
    const createUserService = new CreateUserService(
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

    const findUser = await findUserServide.execute(id)

    expect(findUser).toHaveProperty('id')
  })

  it('Should not be able to collect data from a non-existent user', async () => {
    const fakeUserRepository = new FakeUserRepository()

    const findUserServide = new FindUserService(fakeUserRepository)

    expect(findUserServide.execute('NOT IS A USER')).rejects.toBeInstanceOf(
      AppError
    )
  })
})
