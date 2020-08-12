import { Router } from 'express'

// => Services
import CreateAppointment from '../services/appointment/create.service'

// => Middlewares
import authMiddleware from '../middlewares/auth.middleware'

const routes = Router()

routes.use(authMiddleware)

routes.post('/', async (req, res) => {
  const { date } = req.body as { date: string }
  const { id } = req.user

  const appointment = await CreateAppointment.execute({ date, id })
  return res.status(201).send(appointment)
})

export default routes
