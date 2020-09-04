import { createConnections } from 'typeorm'
import Logger from '@shared/logger'
// import configs from '@config/database.config'

const connectInDatabase = () => {
  createConnections()
    .then(() => {
      Logger('Conected to the database', 'SUCCESS')
    })
    .catch((err) => {
      Logger(err, 'ERROR')
    })
}

connectInDatabase()
