import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { classToClass } from 'class-transformer'

// => Services
import CreateUser from '@modules/users/services/create.service'

class UserController {
  async create(req: Request, res: Response) {
    const createUser = container.resolve(CreateUser)
    const user = await createUser.execute(req.body)
    return res.status(201).json({ user: classToClass(user) })
  }
}

export default new UserController()
