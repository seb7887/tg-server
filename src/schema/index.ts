import { buildSchema } from 'type-graphql'
import { UserResolver } from '@resolvers/users'

export const createSchema = () =>
  buildSchema({
    resolvers: [UserResolver],
  })
