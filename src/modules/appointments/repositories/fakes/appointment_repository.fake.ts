import { uuid } from 'uuidv4'
import { isEqual, getMonth, getYear, getDate } from 'date-fns'

import Appointment from '@modules/appointments/infra/typeorm/entities/appointments.entity'
import IAppointmentRepository from '@modules/appointments/repositories/appointment_repository.interface'
import ListAvailabilityDTO from '@modules/appointments/dtos/list_availability.dto'
import CreateAppointmentDTO from '@modules/appointments/dtos/create_appointment.dto'
import ListProviderDayAvailabilityDTO from '@modules/appointments/dtos/list-provider-day-availability.dto'

class AppointmentRepository implements IAppointmentRepository {
  private database: Appointment[] = []

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.database.find((appoint) =>
      isEqual(appoint.date, date)
    )

    return findAppointment
  }

  public async findAllMonth(
    data: ListAvailabilityDTO
  ): Promise<Appointment[] | undefined> {
    const { providerId, month, year } = data

    const filterAppoint = this.database.filter(
      (appoint) =>
        appoint.providerId === providerId &&
        getYear(appoint.date) === year &&
        getMonth(appoint.date) + 1 === month
    )

    return filterAppoint
  }

  public async findAllDay(
    data: ListProviderDayAvailabilityDTO
  ): Promise<Appointment[] | undefined> {
    const { providerId, day, month, year } = data

    const filterAppoint = this.database.filter(
      (appoint) =>
        appoint.providerId === providerId &&
        getDate(appoint.date) === day &&
        getMonth(appoint.date) + 1 === month &&
        getYear(appoint.date) === year
    )

    return filterAppoint
  }

  public async create(appointment: CreateAppointmentDTO): Promise<Appointment> {
    const { date, providerId } = appointment

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
