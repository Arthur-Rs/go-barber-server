import 'express-async-errors'
import 'reflect-metadata'
import 'dotenv/config'
import '@shared/infra/typeorm'
import '@shared/container'

import express from 'express'
import logger from '@shared/logger'
import ErrorMiddleware from '@shared/infra/http/middlewares/error.middlewares'
import routes from '@shared/infra/http/routes'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())
app.use(routes)
app.use(ErrorMiddleware)

const port = process.env.APP_PORT

app.listen(port, () => {
  logger(`Server init in ${port}`, 'SUCCESS')
})
