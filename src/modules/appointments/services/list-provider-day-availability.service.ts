import 'reflect-metadata'
import { injectable, inject } from 'tsyringe'
import IAppointmentRepository from '@modules/appointments/repositories/appointment_repository.interface'
import ListProviderDayAvailabilityDTO from '../dtos/list-provider-day-availability.dto'
import { getHours, isAfter } from 'date-fns'
import AppError from '@shared/errors/app.error'
import ICache from '@shared/utils/cache/models/cache.interface'

type IResponse = Array<{
  hour: number
  available: boolean
}>

@injectable()
class ListProviderDayAvailability {
  constructor(
    @inject('AppointmentRepository')
    private repository: IAppointmentRepository,

    @inject('Cache')
    private cache: ICache
  ) {}

  public async execute(
    data: ListProviderDayAvailabilityDTO
  ): Promise<IResponse> {
    const { day, month, year, providerId } = data

    const cache = await this.cache.recover('$$')

    if (cache) {
      console.log(cache)
    }

    const appointInDay = await this.repository.findAllDay({
      day,
      month,
      providerId,
      year,
    })

    if (!appointInDay) {
      throw new AppError('Not exist appointments', 400)
    }

    const hourStart = 8
    const currentDate = new Date(Date.now())

    console.log(currentDate)

    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart
    )

    const arrAvailability = eachHourArray.map((hour) => {
      const hasAppointInHour = appointInDay.find(
        (appoint) => getHours(appoint.date) === hour
      )

      const compareDate = new Date(year, month - 1, day, hour)

      return {
        hour,
        available: !hasAppointInHour && isAfter(compareDate, currentDate),
      }
    })

    this.cache.save('$$', '$$')
    return arrAvailability
  }
}

export default ListProviderDayAvailability
