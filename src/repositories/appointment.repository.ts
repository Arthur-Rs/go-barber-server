import { Repository, EntityRepository } from 'typeorm'
import Appointment from '../entities/appointments.entity'

@EntityRepository(Appointment)
class AppointmentRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({ where: { date } })
    console.log({ date, findAppointment })
    return findAppointment || null
  }
}

export default AppointmentRepository
