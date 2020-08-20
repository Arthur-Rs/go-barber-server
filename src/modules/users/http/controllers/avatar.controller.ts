import { Request, Response } from 'express'
import { container } from 'tsyringe'

// => Services
import UploadAvatar from '@modules/users/services/upload.service'

class AvatarController {
  async create(req: Request, res: Response) {
    const { filename: file } = req.file
    const { id: userId } = req.user

    const uploadAvatar = container.resolve(UploadAvatar)
    await uploadAvatar.execute({ file, userId })

    return res.status(201).json({ message: 'Success' })
  }
}

export default new AvatarController()
