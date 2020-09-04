import { Router } from 'express'
import { celebrate, Joi } from 'celebrate'

// => Controllers
import UserController from '../controllers/user.controller'

const routes = Router()

routes.post(
  '/',
  celebrate({
    body: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  UserController.create
)

export default routes
