import {
  Resolver,
  Query,
  Mutation,
  FieldResolver,
  Root,
  UseMiddleware,
  Ctx,
  Arg,
} from 'type-graphql'
import { isAuthenticated } from '@lib/auth'
import { Context } from '@lib/context'
import { Chat } from '@entities/chat'
import { Message } from '@entities/message'
import { User } from '@entities/user'
import { ChatParticipants } from '@entities/chat-participants'
import { NewChatInput } from '@inputs/chats'
import { ChatResponse } from '@interfaces/chats'

@Resolver(Chat)
export class ChatResolver {
  @Query(returns => [Chat])
  @UseMiddleware(isAuthenticated)
  async chats(@Ctx() { currentUser }: Context): Promise<Chat[]> {
    const chatParticipants = await ChatParticipants.find({
      cache: 1000,
      where: {
        participant: currentUser.id,
      },
    })
    const ids = chatParticipants.map(p => p.chatId)
    return Chat.createQueryBuilder('chats')
      .where('chats.id IN (:...ids)', { ids })
      .getMany()
  }

  @Mutation(returns => ChatResponse)
  @UseMiddleware(isAuthenticated)
  async createChat(
    @Ctx() { currentUser }: Context,
    @Arg('newChat') { name, to, firstMessageContent }: NewChatInput
  ): Promise<ChatResponse> {
    const recipientUser = await User.findOne({ id: to })

    if (!recipientUser) {
      throw new Error('Recipient user not found')
    }

    const chat = new Chat()
    chat.name = name
    const { id: chatId } = await chat.save()

    // Create chat participants
    const sender = new ChatParticipants()
    sender.participant = currentUser.id
    sender.chatId = chatId
    await sender.save()

    const recipient = new ChatParticipants()
    recipient.participant = recipientUser.id
    recipient.chatId = chatId
    await recipient.save()

    // Create the first message
    const message = new Message()
    message.content = firstMessageContent
    message.senderId = currentUser.id
    message.recipientId = to
    message.chat = chat
    message.chatId = chatId
    await message.save()

    chat.messages = [message]
    await chat.save()

    return {
      chat,
    }
  }

  @FieldResolver()
  messages(@Root() chat: Chat) {
    return Message.find({ cache: 1000, where: { chatId: chat.id } })
  }

  @FieldResolver()
  async lastMessage(@Root() chat: Chat): Promise<Message> {
    const messages = await Message.find({
      cache: 1000,
      where: { chatId: chat.id },
    })
    return messages[messages.length - 1]
  }

  @FieldResolver()
  async participants(@Root() chat: Chat): Promise<User[]> {
    const chatParticipants = await ChatParticipants.find({
      cache: 1000,
      where: {
        chatId: chat.id,
      },
    })
    const ids = chatParticipants.map(p => p.participant)
    return User.createQueryBuilder('users')
      .where('users.id IN (:...ids)', { ids })
      .getMany()
  }
}
