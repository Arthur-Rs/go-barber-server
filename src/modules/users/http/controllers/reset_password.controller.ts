import { Request, Response } from 'express'

import { container } from 'tsyringe'

// => Services
import ResetPassword from '@modules/users/services/reset_password.service'

class ResetPasswordController {
  async create(req: Request, res: Response) {
    const resetPassword = container.resolve(ResetPassword)
    await resetPassword.execute(req.body)
    return res.status(204).json()
  }
}

export default new ResetPasswordController()
