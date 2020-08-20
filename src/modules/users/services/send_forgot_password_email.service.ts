import { inject, injectable } from 'tsyringe'

import IUserRepository from '@modules/users/repositories/user_repository.interface'
import IUserTokenRepository from '@modules/users/repositories/user_token_repository.interface'
import IMailDTO from '../dtos/send_forgot_passsword_email_service.dto'
import IMail from '@shared/utils/email/models/mail.interface'
import AppError from '@shared/errors/app.error'

@injectable()
class SendForgotPasswordMailService {
  constructor(
    @inject('UserRepository')
    private repository: IUserRepository,

    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,

    @inject('Email')
    private email: IMail
  ) {}

  public async execute(data: IMailDTO): Promise<void> {
    const { email } = data

    const user = await this.repository.findByEmail(email)

    if (!user) {
      throw new AppError('This user not exist', 400)
    }

    const { id } = user

    await this.userTokenRepository.generate(id)
    await this.email.sendMail(email, 'Pedido de recuperação de senha!')
  }
}

export default SendForgotPasswordMailService
