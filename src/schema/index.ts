import { buildSchema } from 'type-graphql'
import { UserResolver } from '@resolvers/users'
import { MessageResolver } from '@resolvers/messages'

export const createSchema = () =>
  buildSchema({
    resolvers: [UserResolver, MessageResolver],
  })
