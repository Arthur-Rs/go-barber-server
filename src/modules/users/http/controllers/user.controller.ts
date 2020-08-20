import { container } from 'tsyringe'
import { Request, Response } from 'express'

// => Services
import CreateUser from '@modules/users/services/create.service'
import DeleteUser from '@modules/users/services/delete.service'
import UpdateUser from '@modules/users/services/update.service'
import FindUser from '@modules/users/services/find.service'

class UserController {
  async show(req: Request, res: Response) {
    const findUser = container.resolve(FindUser)
    const user = await findUser.execute(req.user.id)
    return res.status(201).json(user)
  }

  async create(req: Request, res: Response) {
    const updateUser = container.resolve(UpdateUser)
    const user = await updateUser.execute(req.body)
    return res.status(201).json(user)
  }

  async update(req: Request, res: Response) {
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
