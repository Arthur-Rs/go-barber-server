import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

// => Services
import Authenticate from '@modules/users/services/authenticate.service'

class SessionController {
  async create(req: Request, res: Response) {
    const authenticate = container.resolve(Authenticate)
    const user = await authenticate.execute(req.body)
    return res.status(201).send({ user: classToClass(user) })
  }
}

export default new SessionController()
