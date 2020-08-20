import FakeUserRepository from './../../repositories/fakes/user_repository.fake'
import FakeUserTokenRepository from '../../repositories/fakes/user_token_repository.fake'

import FakeHash from '../../utils/password_hash/fakes/password_hash.fake'

import FakeResetPasswordService from './../reset_password.service'

import AppError from '@shared/errors/app.error'

let fakeUserRepository: FakeUserRepository
let fakeUserTokenRepository: FakeUserTokenRepository
let fakeHash: FakeHash

let resetPasswordService: FakeResetPasswordService

describe('Send Forgot Password Email', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    fakeUserTokenRepository = new FakeUserTokenRepository()
    fakeHash = new FakeHash()

    resetPasswordService = new FakeResetPasswordService(
      fakeUserRepository,
      fakeUserTokenRepository,
      fakeHash
    )
  })

  it('Should be able to update password', async () => {
    const { id } = await fakeUserRepository.create({
      name: 'arthur',
      email: 'arthur@gmail.com',
      password: '12345678',
    })

    const { token } = await fakeUserTokenRepository.generate(id)

    await resetPasswordService.execute({ token, password: '87654321' })

    const user = await fakeUserRepository.findById(id)

    expect(user?.password).toEqual('87654321')
  })

  it('Should not be able to update password if the user or token does not exist', async () => {
    await expect(
      resetPasswordService.execute({
        token: 'IsNotToken',
        password: '87654321',
      })
    ).rejects.toBeInstanceOf(AppError)

    const { id } = await fakeUserRepository.create({
      name: 'arthur',
      email: 'arthur@gmail.com',
      password: '12345678',
    })

    const { token } = await fakeUserTokenRepository.generate(id)

    await fakeUserRepository.remove(id)

    await expect(
      resetPasswordService.execute({ token, password: '87654321' })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('Should be able to create hash', async () => {
    const { id } = await fakeUserRepository.create({
      name: 'arthur',
      email: 'arthur@gmail.com',
      password: '12345678',
    })

    const generateHash = jest.spyOn(fakeHash, 'generateHash')

    const { token } = await fakeUserTokenRepository.generate(id)

    await resetPasswordService.execute({ token, password: '87654321' })

    await fakeUserRepository.findById(id)

    expect(generateHash).toBeCalledWith('87654321')
  })

  it('Should not be able to create token if passed more than 30 minutes', async () => {
    const { id } = await fakeUserRepository.create({
      name: 'arthur',
      email: 'arthur@gmail.com',
      password: '12345678',
    })

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const currentDate = new Date()

      return currentDate.setMinutes(currentDate.getMinutes() + 31)
    })

    const { token } = await fakeUserTokenRepository.generate(id)

    await expect(
      resetPasswordService.execute({ token, password: '87654321' })
    ).rejects.toBeInstanceOf(AppError)
  })
})
