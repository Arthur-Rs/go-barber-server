import { Router } from 'express'

import ProvidersController from '../controllers/providers.controller'
import DayAvailabilityController from '../controllers/day-availability.controller'
import MonthAvailabilityController from '../controllers/month-availability.controller'

// => Middlewares
import authMiddleware from '@modules/users/http/middlewares/auth.middleware'

const routes = Router()

routes.use(authMiddleware)

routes.get('/', ProvidersController.index)
routes.get('/:providerId/day-availability', DayAvailabilityController.index)
routes.get('/:providerId/month-availability', MonthAvailabilityController.index)

export default routes
