import { Repository, getRepository, Raw } from 'typeorm'
import { uuid } from 'uuidv4'

import Appointment from '@modules/appointments/infra/typeorm/entities/appointments.entity'
import IAppointmentRepository from '@modules/appointments/repositories/appointment_repository.interface'
import CreateAppointmentDTO from '@modules/appointments/dtos/create_appointment.dto'
import ListAvailabilityDTO from '@modules/appointments/dtos/list_availability.dto'
import ListProviderInDayAvailabilityDTO from '@modules/appointments/dtos/list-provider-day-availability.dto'

class AppointmentRepository implements IAppointmentRepository {
  private ormRepository: Repository<Appointment>

  constructor() {
    this.ormRepository = getRepository(Appointment)
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    })

    return findAppointment
  }

  public async findAllMonth(
    data: ListAvailabilityDTO
  ): Promise<Appointment[] | undefined> {
    const { providerId, month, year } = data

    const parsedMonth = month.toString().padStart(2, '0')
    const findAppointment = await this.ormRepository.find({
      where: {
        providerId,
        date: Raw(
          (fieldName) =>
            `to_char(${fieldName}, 'MM-YYYY') = '${parsedMonth}-${year.toString()}'`
        ),
      },
    })

    return findAppointment
  }

  public async findAllDay(
    data: ListProviderInDayAvailabilityDTO
  ): Promise<Appointment[] | undefined> {
    const { providerId, day, month, year } = data

    const parsedDay = day.toString().padStart(2, '0')
    const parsedMonth = month.toString().padStart(2, '0')

    const findAppointment = await this.ormRepository.find({
      where: {
        providerId,
        date: Raw(
          (fieldName) =>
            `to_char(${fieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year.toString()}'`
        ),
      },
    })

    return findAppointment
  }

  public async create(data: CreateAppointmentDTO): Promise<Appointment> {
    const { date, providerId, userId } = data

    const newAppointment = this.ormRepository.create({
      id: uuid(),
      date,
      userId,
      providerId,
    })

    await this.ormRepository.save(newAppointment)

    return newAppointment
  }
}

export default AppointmentRepository
