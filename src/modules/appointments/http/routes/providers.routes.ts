import { Router } from 'express'

import ProvidersController from '../controllers/providers.controller'
import DayAvailabilityController from '../controllers/day-availability.controller'
import MonthAvailabilityController from '../controllers/month-availability.controller'
import { celebrate, Joi } from 'celebrate'

// => Middlewares
import authMiddleware from '@modules/users/http/middlewares/auth.middleware'

const routes = Router()

routes.use(authMiddleware)

routes.get('/', ProvidersController.index)
routes.get(
  '/:providerId/day-availability',
  celebrate({
    params: {
      providerId: Joi.string(),
    },
    body: {
      year: Joi.number().required(),
      month: Joi.number().required(),
      day: Joi.number().required(),
    },
  }),
  DayAvailabilityController.index
)
routes.get(
  '/:providerId/month-availability',
  celebrate({
    params: {
      providerId: Joi.string(),
    },
    body: {
      year: Joi.number().required(),
      month: Joi.number().required(),
    },
  }),
  MonthAvailabilityController.index
)

export default routes
