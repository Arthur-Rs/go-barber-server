import 'reflect-metadata'
import { inject, injectable } from 'tsyringe'
import { resolve } from 'path'

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

    const { token } = await this.userTokenRepository.generate(id)

    const pathTemplate = resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs'
    )

    const resetLink = process.env.LINK_RESET

    await this.email.sendMail({
      to: {
        email: user.email,
        name: user.name,
      },
      subject: 'Recuperação de senha',
      templateData: {
        file: pathTemplate,
        variables: {
          name: user.name,
          link: `${resetLink}${token}`,
        },
      },
    })
  }
}

export default SendForgotPasswordMailService
