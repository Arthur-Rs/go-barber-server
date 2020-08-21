import { container } from 'tsyringe'

import '@modules/users/container'
import '../utils/storange/container'

import IAppointmentRepository from '@modules/appointments/repositories/appointment_repository.interface'
import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/appointment.repository'

import IUserRepository from '@modules/users/repositories/user_repository.interface'
import UserRepository from '@modules/users/infra/typeorm/repositories/user.repository'

import IUserTokenRepository from '@modules/users/repositories/user_token_repository.interface'
import UserTokenRepository from '@modules/users/infra/typeorm/repositories/user_token.repository'

import IMail from '@shared/utils/email/models/mail.interface'
import Mail from '@shared/utils/email/implementations/ethereal'

import MailTemplate from '@shared/utils/email/templates/implementations/handlebars'
import IMailTemplate from '@shared/utils/email/templates/models/template_mail.interface'

container.registerSingleton<IAppointmentRepository>(
  'AppointmentRepository',
  AppointmentRepository
)

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)

container.registerSingleton<IUserTokenRepository>(
  'UserTokenRepository',
  UserTokenRepository
)

container.registerSingleton<IMailTemplate>('MailTemplate', MailTemplate)

container.registerInstance<IMail>('Email', container.resolve(Mail))
