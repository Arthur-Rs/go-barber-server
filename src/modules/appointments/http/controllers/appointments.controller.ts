import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { parseISO } from 'date-fns'

import CreateAppointment from '@modules/appointments/services/create.service'

class AppointmentsController {
  public async create(req: Request, res: Response) {
    const { date, providerId } = req.body as {
      date: string
      providerId: string
    }
    const { id: userId } = req.user

    const createAppointment = container.resolve(CreateAppointment)

    const parsedDate = parseISO(date)

    const appointment = await createAppointment.execute({
      date: parsedDate,
      providerId,
      userId,
    })
    return res.status(201).send(appointment)
  }
}

export default new AppointmentsController()
