import { Resolver, Query } from 'type-graphql'

@Resolver()
export class UserResolver {
  @Query(returns => String)
  hello() {
    return 'world!'
  }
}
