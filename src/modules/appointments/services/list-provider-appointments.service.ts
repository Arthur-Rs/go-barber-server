import 'reflect-metadata'
import { injectable, inject } from 'tsyringe'
import IAppointmentRepository from '@modules/appointments/repositories/appointment_repository.interface'
import ListProviderDayAvailabilityDTO from '../dtos/list-provider-day-availability.dto'
import Appointment from '../entities/appointment.entity'
import ICache from '@shared/utils/cache/models/cache.interface'
import { classToClass } from 'class-transformer'

@injectable()
class ListProviderDayAvailability {
  constructor(
    @inject('AppointmentRepository')
    private repository: IAppointmentRepository,

    @inject('Cache')
    private cache: ICache
  ) {}

  public async execute({
    day,
    month,
    providerId,
    year,
  }: ListProviderDayAvailabilityDTO): Promise<Appointment[]> {
    const cacheKey = `provider-appointments:${providerId}:${day}-${month}-${year}`

    let appointments = await this.cache.recover<Appointment[]>(cacheKey)

    if (!appointments) {
      appointments = (await this.repository.findAllDay({
        providerId,
        day,
        month,
        year,
      })) as Appointment[] | null

      await this.cache.save(cacheKey, classToClass(appointments))
    }
    return appointments || []
  }
}

export default ListProviderDayAvailability
