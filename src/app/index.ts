import 'express-async-errors'
import 'reflect-metadata'
import 'dotenv/config'

import express from 'express'
import logger from '../logger'
import ErrorMiddleware from '../middlewares/error.middlewares'

const app = express()
app.use(ErrorMiddleware)
app.use(express.json())

const Init = () => {
  const port = process.env.APP_PORT

  app.listen(port, () => {
    logger(`SERVER INIT IN PORT ${port}`, 'SUCCESS')
  })
}

export default Init
