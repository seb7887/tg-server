import {
  Resolver,
  Query,
  Mutation,
  FieldResolver,
  Arg,
  Ctx,
  UseMiddleware,
  Root,
} from 'type-graphql'
import { Message } from '@entities/message'
import { User } from '@entities/user'
import { isAuthenticated } from '@lib/auth'

@Resolver(Message)
export class MessageResolver {
  @Query(returns => [Message])
  @UseMiddleware(isAuthenticated)
  messages(): Promise<Message[]> {
    return Message.find()
  }

  @FieldResolver()
  sender(@Root() message: Message) {
    return User.find({
      cache: 1000,
      where: { id: message.sender.id },
    })
  }

  @FieldResolver()
  recipient(@Root() message: Message) {
    return User.find({
      cache: 1000,
      where: { id: message.recipient.id },
    })
  }
}
