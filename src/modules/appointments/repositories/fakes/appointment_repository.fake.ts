import { uuid } from 'uuidv4'
import { isEqual } from 'date-fns'

import Appointment from '@modules/appointments/infra/typeorm/entities/appointments.entity'
import IAppointmentRepository from '@modules/appointments/repositories/appointment_repository.interface'
import CreateAppointmentDTO from '@modules/appointments/dtos/create_appointment.dto'

class AppointmentRepository implements IAppointmentRepository {
  private database: Appointment[] = []

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.database.find((appoint) =>
      isEqual(appoint.date, date)
    )

    return findAppointment
  }

  public async create(data: CreateAppointmentDTO): Promise<Appointment> {
    const { date, providerId } = data

    const newAppointment = new Appointment()

    Object.assign(newAppointment, {
      id: uuid(),
      date,
      providerId,
    })

    this.database.push(newAppointment)

    return newAppointment
  }
}

export default AppointmentRepository
