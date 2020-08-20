import { container } from 'tsyringe'

import '../utils/storange/container'

import IAppointmentRepository from '@modules/appointments/repositories/appointment_repository.interface'
import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/appointment.repository'

import IUserRepository from '@modules/users/repositories/user_repository.interface'
import UserRepository from '@modules/users/infra/typeorm/repositories/user.repository'

import IUserTokenRepository from '@modules/users/repositories/user_token_repository.interface'
import UserTokenRepository from '@modules/users/infra/typeorm/repositories/user_token.repository'

container.registerSingleton<IAppointmentRepository>(
  'AppointmentRepository',
  AppointmentRepository
)

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)

container.registerSingleton<IUserTokenRepository>(
  'UserTokenRepository',
  UserTokenRepository
)
