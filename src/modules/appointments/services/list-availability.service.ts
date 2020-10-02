import 'reflect-metadata'
import { injectable, inject } from 'tsyringe'
import ListAvailabilityDTO from '../dtos/list_availability.dto'
import IAppointmentRepository from '@modules/appointments/repositories/appointment_repository.interface'
import { getDaysInMonth, getDate } from 'date-fns'
import AppError from '@shared/errors/app.error'
import ICache from '@shared/utils/cache/models/cache.interface'

type IResponse = Array<{
  day: number
  available: boolean
}>

@injectable()
class ListAvailabilityService {
  constructor(
    @inject('AppointmentRepository')
    private repository: IAppointmentRepository,

    @inject('Cache')
    private cache: ICache
  ) {}

  public async execute(data: ListAvailabilityDTO): Promise<IResponse> {
    const { providerId, month, year } = data
    const appointInMonth = await this.repository.findAllMonth({
      month,
      providerId,
      year,
    })

    if (!appointInMonth) {
      throw new AppError('Not exist appointments', 400)
    }

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1))

    const eachDayArray = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1
    )

    const availability = eachDayArray.map((day) => {
      const appointInDay = appointInMonth.filter(
        (appoint) => getDate(appoint.date) === day
      )

      return {
        day,
        available: appointInDay.length < 10,
      }
    })

    return availability
  }
}

export default ListAvailabilityService
