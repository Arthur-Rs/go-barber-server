import 'dotenv/config'
import { ConnectionOptions } from 'typeorm'

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: ['./modules/**/infra/typeorm/entities/*.ts'],
  migrations: ['./shared/infra/typeorm/migrations/*.ts'],
}

export default config
