import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ShowAllProviders from '@modules/appointments/services/show-all-providers.service'

class ProvidersController {
  public async index(req: Request, res: Response) {
    const { id: expectId } = req.user

    const showAllProviders = container.resolve(ShowAllProviders)

    const providers = await showAllProviders.execute({
      expectId,
    })
    return res.json(providers)
  }
}

export default new ProvidersController()
