import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListAvailabilityService from '@modules/appointments/services/list-availability.service'

class ProviderMonthAvailabilityController {
  public async index(req: Request, res: Response) {
    const { month, year } = req.query
    const { providerId } = req.params

    const service = container.resolve(ListAvailabilityService)

    const providers = await service.execute({
      month: Number(month),
      year: Number(year),
      providerId,
    })
    return res.json(providers)
  }
}

export default new ProviderMonthAvailabilityController()
