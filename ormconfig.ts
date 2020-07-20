import 'dotenv/config'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

const typeOrmConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: 5432,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: false,
  entities: ['src/entities/**/*.ts'],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscribers/**/*.ts'],
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  logger: 'simple-console',
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migrations',
    subscribersDir: 'src/subscribers',
  },
}

export default typeOrmConfig
