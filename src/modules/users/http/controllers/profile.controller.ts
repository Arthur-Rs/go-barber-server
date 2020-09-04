import { container } from 'tsyringe'
import { Request, Response } from 'express'

// => Services
import DeleteUser from '@modules/users/services/delete.service'
import UpdateUser from '@modules/users/services/update.service'
import FindUser from '@modules/users/services/show.service'

class ProfileController {
  async show(req: Request, res: Response) {
    const findUser = container.resolve(FindUser)
    const user = await findUser.execute(req.user.id)
    return res.status(200).json(user)
  }

  async update(req: Request, res: Response) {
    const updateUser = container.resolve(UpdateUser)
    const user = await updateUser.execute({ id: req.user.id, ...req.body })
    return res.status(200).json(user)
  }

  async delete(req: Request, res: Response) {
    const { password } = req.body as { password: string }
    const { id } = req.user

    const deleteUser = container.resolve(DeleteUser)
    await deleteUser.execute({ id, password })

    return res.status(200).json({ message: 'Success' })
  }
}

export default new ProfileController()
