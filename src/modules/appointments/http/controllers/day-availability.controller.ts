import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListAvailabilityService from '@modules/appointments/services/list-provider-day-availability.service'

class ProviderDayAvailabilityController {
  public async index(req: Request, res: Response) {
    const { month, day, year } = req.body
    const { providerId } = req.params

    const service = container.resolve(ListAvailabilityService)

    const daysAvailability = await service.execute({
      day,
      month,
      providerId,
      year,
    })
    return res.json(daysAvailability)
  }
}

export default new ProviderDayAvailabilityController()
