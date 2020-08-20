import express, { Router } from 'express'

// => Routes
import appointmentsRoutes from '@modules/appointments/http/routes/appointments.routes'
import usersRoutes from '@modules/users/http/routes/users.routes'
import sessionRoutes from '@modules/users/http/routes/session.routes'

// => middlewares
import LoggerMiddleware from '@shared/infra/http/middlewares/logger.middleware'

// => Configs
import { path } from '@config/multer.config'

const routes = Router()

routes.use(LoggerMiddleware)

routes.use('/users', usersRoutes)
routes.use('/appointments', appointmentsRoutes)
routes.use('/session', sessionRoutes)

routes.use('/avatar', express.static(path))

export default routes
