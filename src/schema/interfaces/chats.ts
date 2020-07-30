import { Field, ObjectType } from 'type-graphql'
import { Chat } from '@entities/chat'

@ObjectType()
export class ChatResponse {
  @Field(() => Chat, { nullable: false })
  chat: Chat
}

@ObjectType()
export class ChatsResponse {
  @Field(() => [Chat], { nullable: false })
  chats: Chat[]
}
