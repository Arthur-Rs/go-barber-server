import { Router } from 'express'

// => Configs
import authMiddleware from '@modules/users/http/middlewares/auth.middleware'
import upload from '@config/multer.config'

// => Controllers
import UserController from '../controllers/user.controller'
import AvatarController from '../controllers/avatar.controller'

const routes = Router()

// <== PUBLIC ROUTES ==>

routes.post('/', UserController.create)

// <== PRIVATE ROUTES ==>

routes.use(authMiddleware)

routes.get('/', upload.single('file'), UserController.show)

routes.delete('/', upload.single('file'), UserController.delete)

routes.put('/', upload.single('file'), UserController.update)

// <== AVATAR ROUTES ==>

routes.put('/avatar', upload.single('file'), AvatarController.create)

export default routes
