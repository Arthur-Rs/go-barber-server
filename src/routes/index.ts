import express, { Router } from 'express'

// => Routes
import appointmentsRoutes from './appointments.routes'
import usersRoutes from './users.routes'
import sessionRoutes from './session.routes'

// => middlewares
import LoggerMiddleware from '../middlewares/logger.middleware'

// => Configs
import { path } from '../config/multer.config'

const routes = Router()

routes.use(LoggerMiddleware)

routes.use('/users', usersRoutes)
routes.use('/appointments', appointmentsRoutes)
routes.use('/session', sessionRoutes)

routes.use('/avatar', express.static(path))

export default routes
