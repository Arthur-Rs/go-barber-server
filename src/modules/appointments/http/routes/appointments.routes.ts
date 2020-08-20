import { Router } from 'express'
import { container } from 'tsyringe'

// => Services
import CreateAppointment from '@modules/appointments/services/create.service'

// => Middlewares
import authMiddleware from '@modules/users/http/middlewares/auth.middleware'

const routes = Router()

routes.use(authMiddleware)

routes.post('/', async (req, res) => {
  const { date } = req.body as { date: string }
  const { id: providerId } = req.user

  const createAppointment = container.resolve(CreateAppointment)

  const appointment = await createAppointment.execute({
    date,
    providerId,
  })
  return res.status(201).send(appointment)
})

export default routes
