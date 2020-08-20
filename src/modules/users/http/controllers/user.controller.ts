import { container } from 'tsyringe'
import { Request, Response } from 'express'

// => Services
import CreateUser from '@modules/users/services/create.service'

import DeleteUser from '@modules/users/services/delete.service'

class UserController {
  async create(req: Request, res: Response) {
    const createUser = container.resolve(CreateUser)
    const user = await createUser.execute(req.body)
    return res.status(201).json(user)
  }

  async delete(req: Request, res: Response) {
    const { password } = req.body as { password: string }
    const { id } = req.user

    const deleteUser = container.resolve(DeleteUser)
    await deleteUser.execute({ id, password })

    return res.status(201).json({ message: 'Success' })
  }
}

export default new UserController()
