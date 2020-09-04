import { Router } from 'express'
import SessionController from '../controllers/session.controller'
import { celebrate, Joi } from 'celebrate'

const routes = Router()

routes.post(
  '/',
  celebrate({
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    },
  }),
  SessionController.create
)

export default routes
