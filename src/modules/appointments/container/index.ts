import { container } from 'tsyringe'

import IAppointmentRepository from '@modules/appointments/repositories/appointment_repository.interface'
import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/appointment.repository'

container.registerSingleton<IAppointmentRepository>(
  'AppointmentRepository',
  AppointmentRepository
)
