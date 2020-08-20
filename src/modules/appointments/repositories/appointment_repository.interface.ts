import Appointment from '../infra/typeorm/entities/appointments.entity'
import CreateAppointmentDTO from '../dtos/create_appointment.dto'

export default interface IAppointmentRepository {
  create(appointment: CreateAppointmentDTO): Promise<Appointment>
  findByDate(date: Date): Promise<Appointment | undefined>
}
