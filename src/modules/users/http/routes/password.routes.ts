import { Router } from 'express'
import { celebrate, Joi } from 'celebrate'

// => Controllers
import ForgotController from '../controllers/forgot.controller'
import ResetPasswrodController from '../controllers/reset_password.controller'

const routes = Router()

routes.post(
  '/forgot',
  celebrate({
    body: {
      email: Joi.string().email().required(),
    },
  }),
  ForgotController.create
)
routes.post(
  '/reset',
  celebrate({
    body: {
      token: Joi.string().uuid().required(),
      password: Joi.string().min(8).required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  ResetPasswrodController.create
)

export default routes
