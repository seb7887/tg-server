import 'module-alias/register'
import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import { createConnection } from 'typeorm'

import { typeOrmConfig } from '../ormconfig'
import { createSchema } from '@schema'

const startServer = async () => {
  const schema = await createSchema()

  await createConnection(typeOrmConfig)

  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({
      req,
      res,
    }),
  })

  await server.listen(process.env.PORT)
  console.log(`Apollo Server listening on port ${process.env.PORT!}`)
}

startServer()
