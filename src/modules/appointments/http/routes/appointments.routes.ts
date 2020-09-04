import { Router } from 'express'

import AppointmentService from '../controllers/appointments.controller'
import ProviderAppointment from '../controllers/provider-appointments.controller'

// => Middlewares
import authMiddleware from '@modules/users/http/middlewares/auth.middleware'

const routes = Router()

routes.use(authMiddleware)

routes.post('/', AppointmentService.create)

routes.get('/me', ProviderAppointment.index)

export default routes
