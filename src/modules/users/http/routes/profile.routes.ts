import { Router } from 'express'
import { celebrate, Joi } from 'celebrate'

// => Configs
import authMiddleware from '@modules/users/http/middlewares/auth.middleware'
import upload from '@config/multer.config'

// => Controllers
import ProfileController from '../controllers/profile.controller'
import AvatarController from '../controllers/avatar.controller'

const routes = Router()

routes.use(authMiddleware)

routes.get('/', upload.single('file'), ProfileController.show)

routes.delete(
  '/',
  celebrate({
    body: {
      id: Joi.string().uuid().required(),
    },
  }),
  ProfileController.delete
)

routes.put(
  '/',
  celebrate({
    body: {
      name: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string().min(8),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  upload.single('file'),
  ProfileController.update
)

// <== AVATAR ROUTES ==>

routes.put('/avatar', upload.single('file'), AvatarController.create)

export default routes
