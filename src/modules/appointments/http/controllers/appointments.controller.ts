import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateAppointment from '@modules/appointments/services/create.service'

class AppointmentsController {
  public async create(req: Request, res: Response) {
    const { date, providerId } = req.body as {
      date: Date
      providerId: string
    }
    const { id: userId } = req.user

    const createAppointment = container.resolve(CreateAppointment)

    const appointment = await createAppointment.execute({
      date,
      providerId,
      userId,
    })
    return res.status(201).send(appointment)
  }
}

export default new AppointmentsController()
