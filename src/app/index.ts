import 'express-async-errors'
import 'reflect-metadata'
import 'dotenv/config'
import '../database'

import express from 'express'
import logger from '../logger'
import ErrorMiddleware from '../middlewares/error.middlewares'
import routes from '../routes'

const app = express()
app.use(express.json())
app.use(routes)
app.use(ErrorMiddleware)

const Init = () => {
  const port = process.env.APP_PORT

  app.listen(port, () => {
    logger(`Server init in ${port}`, 'SUCCESS')
  })
}

export default Init
