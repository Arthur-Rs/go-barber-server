import FakeUserRepository from './../../repositories/fakes/user_repository.fake'
import FakeUserTokenRepository from '../../repositories/fakes/user_token_repository.fake'
import FakeMail from '@shared/utils/email/fakes/email.fake'

import SendForgotPasswordEmailService from './../send_forgot_password_email.service'
import AppError from '@shared/errors/app.error'

let fakeUserRepository: FakeUserRepository
let fakeUserTokenRepository: FakeUserTokenRepository
let fakeMail: FakeMail

let sendForgotPasswordEmailService: SendForgotPasswordEmailService
describe('Send Forgot Password Email', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    fakeUserTokenRepository = new FakeUserTokenRepository()
    fakeMail = new FakeMail()

    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUserRepository,
      fakeUserTokenRepository,
      fakeMail
    )
  })

  it('Should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMail, 'sendMail')

    await fakeUserRepository.create({
      name: 'arthur',
      email: 'arthur@gmail.com',
      password: '12345678',
    })

    await sendForgotPasswordEmailService.execute({
      email: 'arthur@gmail.com',
    })

    expect(sendMail).toHaveBeenCalled()
  })

  it('Should not be able to recover a non-existing user ', async () => {
    await expect(
      sendForgotPasswordEmailService.execute({
        email: 'arthur@gmail.com',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('Should generate a forgot password token', async () => {
    const generate = jest.spyOn(fakeUserTokenRepository, 'generate')

    const { id } = await fakeUserRepository.create({
      name: 'arthur',
      email: 'arthur@gmail.com',
      password: '12345678',
    })

    await sendForgotPasswordEmailService.execute({
      email: 'arthur@gmail.com',
    })

    expect(generate).toHaveBeenCalledWith(id)
  })
})
