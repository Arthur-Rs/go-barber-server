import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListProviderAppointments from '@modules/appointments/services/list-provider-appointments.service'

class ProviderAppointmentsController {
  public async index(req: Request, res: Response) {
    const { month, day, year } = req.body
    const providerId = req.user.id

    const service = container.resolve(ListProviderAppointments)

    const appointments = await service.execute({
      day,
      month,
      providerId,
      year,
    })
    return res.json(appointments)
  }
}

export default new ProviderAppointmentsController()
