import 'reflect-metadata'
import { injectable, inject } from 'tsyringe'
import IAppointmentRepository from '@modules/appointments/repositories/appointment_repository.interface'
import ListProviderDayAvailabilityDTO from '../dtos/list-provider-day-availability.dto'
import Appointment from '../entities/appointment.entity'

@injectable()
class ListProviderDayAvailability {
  constructor(
    @inject('AppointmentRepository')
    private repository: IAppointmentRepository
  ) {}

  public async execute({
    day,
    month,
    providerId,
    year,
  }: ListProviderDayAvailabilityDTO): Promise<Appointment[]> {
    const appointments = await this.repository.findAllDay({
      providerId,
      day,
      month,
      year,
    })

    return appointments || []
  }
}

export default ListProviderDayAvailability
