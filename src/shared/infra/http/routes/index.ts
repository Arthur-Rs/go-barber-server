import express, { Router } from 'express'

// => Routes
import appointmentsRoutes from '@modules/appointments/http/routes/appointments.routes'
import usersRoutes from '@modules/users/http/routes/users.routes'
import sessionRoutes from '@modules/users/http/routes/session.routes'
import passwordRoutes from '@modules/users/http/routes/password.routes'
import profileRoutes from '@modules/users/http/routes/profile.routes'
import providersRoutes from '@modules/appointments/http/routes/providers.routes'

// => middlewares
import LoggerMiddleware from '@shared/infra/http/middlewares/logger.middleware'

// => Configs
import { pathFolder } from '@config/multer.config'

const routes = Router()

routes.use(LoggerMiddleware)

routes.use('/appointments', appointmentsRoutes)
routes.use('/providers', providersRoutes)

routes.use('/users', usersRoutes)
routes.use('/session', sessionRoutes)
routes.use('/password', passwordRoutes)
routes.use('/profile', profileRoutes)
routes.use('/avatar', express.static(pathFolder))

export default routes
