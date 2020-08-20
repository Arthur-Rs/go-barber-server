import 'reflect-metadata'
import { startOfHour } from 'date-fns'
import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/app.error'
import Appointment from '@modules/appointments/infra/typeorm/entities/appointments.entity'
import CreateAppointmentDTO from '@modules/appointments/dtos/create_appointment.dto'
import IAppointmentRepository from '@modules/appointments/repositories/appointment_repository.interface'

@injectable()
class CreateAppointment {
  constructor(
    @inject('AppointmentRepository')
    private repository: IAppointmentRepository
  ) {}

  public async execute(data: CreateAppointmentDTO): Promise<Appointment> {
    const { date, providerId } = data

    const formatedDate = startOfHour(date)
    const findDate = await this.repository.findByDate(formatedDate)

    if (findDate) {
      throw new AppError('This appointment is already booked', 400)
    }

    const newAppointment = await this.repository.create({
      date,
      providerId,
    })

    return newAppointment
  }
}

export default CreateAppointment
