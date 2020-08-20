import { Router } from 'express'

// => Configs
import authMiddleware from '@modules/users/http/middlewares/auth.middleware'
import upload from '@config/multer.config'

// => Controllers
import UserController from '../controllers/user.controller'
import AvatarController from '../controllers/avatar.controller'

const routes = Router()

routes.post('/', UserController.create)

routes.use(authMiddleware)

routes.delete('/', upload.single('file'), UserController.delete)

routes.put('/avatar', upload.single('file'), AvatarController.create)

export default routes
