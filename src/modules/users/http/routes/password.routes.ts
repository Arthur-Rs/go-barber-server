import { Router } from 'express'

// => Controllers
import ForgotController from '../controllers/forgot.controller'
import ResetPasswrodController from '../controllers/reset_password.controller'

const routes = Router()

routes.post('/forgot', ForgotController.create)
routes.post('/reset', ResetPasswrodController.create)

export default routes
