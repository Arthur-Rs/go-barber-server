import 'express-async-errors'
import 'reflect-metadata'
import 'dotenv/config'

import express from 'express'
import logger from '../logger'
import ErrorMiddleware from '../middlewares/error.middlewares'

class App {
  app: express.Application

  constructor () {
    this.app = express()
    this.app.use(ErrorMiddleware)
    this.app.use(express.json())
  }

  Init () {
    const port = process.env.APP_PORT

    this.app.listen(port, () => {
      logger(`SERVER INIT IN PORT ${port}`, 'SUCCESS')
    })
  }
}

export default new App()
