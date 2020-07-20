import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import { createConnection } from 'typeorm'

import { typeOrmConfig } from '../ormconfig'
import { createSchema } from '@schema'

const startServer = async () => {
  const schema = await createSchema()

  try {
    await createConnection(typeOrmConfig)
  } catch (err) {
    throw err
  }

  const server = new ApolloServer({
    schema,
  })

  await server.listen(4000)
  console.log('Apollo Server listening on port 4000')
}

startServer()
