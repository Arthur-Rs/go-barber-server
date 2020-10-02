import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

// => Services
import UploadAvatar from '@modules/users/services/upload.service'

class AvatarController {
  async create(req: Request, res: Response) {
    const { filename: file } = req.file
    const { id: userId } = req.user

    const uploadAvatar = container.resolve(UploadAvatar)
    const user = await uploadAvatar.execute({ file, userId })

    return res.status(201).json({ user: classToClass(user) })
  }
}

export default new AvatarController()
