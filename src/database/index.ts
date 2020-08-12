import { createConnection } from 'typeorm'
import Logger from '../logger'

const connectInDatabase = () => {
  createConnection()
    .then(() => {
      Logger('Conected to the database', 'SUCCESS')
    })
    .catch(() => {
      Logger('Error connecting to the database', 'ERROR')
    })
}

connectInDatabase()
