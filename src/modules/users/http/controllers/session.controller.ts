import { Request, Response } from 'express'

import { container } from 'tsyringe'

// => Services
import Authenticate from '@modules/users/services/authenticate.service'

class SessionController {
  async create(req: Request, res: Response) {
    const authenticate = container.resolve(Authenticate)
    const appointment = await authenticate.execute(req.body)
    return res.status(201).send(appointment)
  }
}

export default new SessionController()
