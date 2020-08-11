import { createConnection } from 'typeorm'

const connectInDatabase = () => {
  createConnection()
}

connectInDatabase()
