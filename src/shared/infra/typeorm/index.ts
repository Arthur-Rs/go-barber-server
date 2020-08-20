import { createConnection } from 'typeorm'
import Logger from '@shared/logger'
// import configs from '@config/database.config'

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
