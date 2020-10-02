import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListProviderAppointments from '@modules/appointments/services/list-provider-appointments.service'

class ProviderAppointmentsController {
  public async index(req: Request, res: Response) {
    const { month, day, year } = req.query
    const providerId = req.user.id

    const service = container.resolve(ListProviderAppointments)

    const appointments = await service.execute({
      day: Number(day),
      month: Number(month),
      year: Number(year),
      providerId,
    })
    return res.json(appointments)
  }
}

export default new ProviderAppointmentsController()
