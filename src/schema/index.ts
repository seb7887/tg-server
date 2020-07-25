import { buildSchema } from 'type-graphql'
import { UserResolver } from '@resolvers/users'
import { MessageResolver } from '@resolvers/messages'
import { ChatResolver } from '@resolvers/chats'

export const createSchema = () =>
  buildSchema({
    resolvers: [UserResolver, MessageResolver, ChatResolver],
  })
