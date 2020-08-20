import { Repository, getRepository } from 'typeorm'
import { uuid } from 'uuidv4'

import Appointment from '@modules/appointments/infra/typeorm/entities/appointments.entity'
import IAppointmentRepository from '@modules/appointments/repositories/appointment_repository.interface'
import CreateAppointmentDTO from '@modules/appointments/dtos/create_appointment.dto'

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

  public async create(data: CreateAppointmentDTO): Promise<Appointment> {
    const { date, providerId } = data

    const newAppointment = this.ormRepository.create({
      id: uuid(),
      date,
      providerId,
    })

    await this.ormRepository.save(newAppointment)

    return newAppointment
  }
}

export default AppointmentRepository
