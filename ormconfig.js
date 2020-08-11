require('dotenv').config()
var path = require('path')

module.exports = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [
    path.resolve(__dirname, 'src', 'entities', '*.ts')
  ],
  migrations: [
    path.resolve(__dirname, 'src', 'database', 'migrations', '*.ts')
  ],
  cli: {
    entitiesDir: './src/entities',
    migrationsDir: './src/database/migrations'
  }
}
