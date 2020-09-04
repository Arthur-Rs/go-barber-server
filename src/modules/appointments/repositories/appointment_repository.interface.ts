import Appointment from '../infra/typeorm/entities/appointments.entity'
import ListProviderAvailabilityDTO from '../dtos/list_availability.dto'
import ListProviderDayAvailabilityDTO from '../dtos/list-provider-day-availability.dto'
import CreateAppointmentDTO from '../dtos/create_appointment.dto'

export default interface IAppointmentRepository {
  create(appointment: CreateAppointmentDTO): Promise<Appointment>
  findByDate(data: Date): Promise<Appointment | undefined>
  findAllMonth(
    data: ListProviderAvailabilityDTO
  ): Promise<Appointment[] | undefined>
  findAllDay(
    data: ListProviderDayAvailabilityDTO
  ): Promise<Appointment[] | undefined>
}
