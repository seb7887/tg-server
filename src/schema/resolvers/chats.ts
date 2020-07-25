import { Resolver, Query } from 'type-graphql'
import { Chat } from '@entities/chat'

@Resolver(Chat)
export class ChatResolver {
  @Query(returns => String)
  hello() {
    return 'World!'
  }
}
