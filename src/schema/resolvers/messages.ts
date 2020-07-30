import {
  Resolver,
  Query,
  Mutation,
  FieldResolver,
  Subscription,
  Arg,
  Ctx,
  PubSub,
  PubSubEngine,
  UseMiddleware,
  Root,
} from 'type-graphql'
import { Message } from '@entities/message'
import { User } from '@entities/user'
import { Chat } from '@entities/chat'
import { isAuthenticated } from '@lib/auth'
import { Context } from '@lib/context'
import { NewMessageInput } from '@inputs/messages'
import { MessageResponse } from '@interfaces/messages'

@Resolver(Message)
export class MessageResolver {
  @Query(returns => [Message])
  @UseMiddleware(isAuthenticated)
  messages(@Ctx() { currentUser }: Context): Promise<Message[]> {
    return Message.find({ where: { senderId: currentUser.id } })
  }

  @Mutation(returns => MessageResponse)
  @UseMiddleware(isAuthenticated)
  async addMessage(
    @Ctx() { currentUser }: Context,
    @Arg('newMessage') { content, chatId, recipientId }: NewMessageInput,
    @PubSub() pubSub: PubSubEngine
  ): Promise<MessageResponse> {
    const message = new Message()
    message.content = content
    message.senderId = currentUser.id
    message.recipientId = recipientId
    message.chatId = chatId
    await message.save()

    pubSub.publish('messageAdded', { message })

    return {
      message,
    }
  }

  @Subscription(returns => MessageResponse, { topics: 'messageAdded' })
  messageAdded(@Root() { message }: MessageResponse) {
    return {
      message,
    }
  }

  @FieldResolver()
  sender(@Root() message: Message) {
    return User.findOne({
      cache: 1000,
      where: { id: message.senderId },
    })
  }

  @FieldResolver()
  recipient(@Root() message: Message) {
    return User.findOne({
      cache: 1000,
      where: { id: message.recipientId },
    })
  }

  @FieldResolver()
  chat(@Root() message: Message) {
    return Chat.findOne({
      cache: 1000,
      where: { id: message.chatId },
    })
  }
}
