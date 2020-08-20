import { Request, Response } from 'express'

import { container } from 'tsyringe'

// => Services
import SendForgotPasswordEmail from '@modules/users/services/send_forgot_password_email.service'

class ForgotPasswordController {
  async create(req: Request, res: Response) {
    const forgot = container.resolve(SendForgotPasswordEmail)
    await forgot.execute(req.body)
    return res.status(204).json()
  }
}

export default new ForgotPasswordController()
