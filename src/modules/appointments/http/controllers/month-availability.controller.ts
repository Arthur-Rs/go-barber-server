import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListAvailabilityService from '@modules/appointments/services/list-availability.service'

class ProviderMonthAvailabilityController {
  public async index(req: Request, res: Response) {
    const { month, year } = req.body
    const { providerId } = req.params

    const service = container.resolve(ListAvailabilityService)

    const providers = await service.execute({
      month,
      providerId,
      year,
    })
    return res.json(providers)
  }
}

export default new ProviderMonthAvailabilityController()
