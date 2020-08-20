import { container } from 'tsyringe'

import IAppointmentRepository from '@modules/appointments/repositories/appointment_repository.interface'
import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/appointment.repository'

import IUserRepository from '@modules/users/repositories/user_repository.interface'
import UserRepository from '@modules/users/infra/typeorm/repositories/user.repository'

container.registerSingleton<IAppointmentRepository>(
  'AppointmentRepository',
  AppointmentRepository
)

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)
