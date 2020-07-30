import { Field, ObjectType } from 'type-graphql'
import { Message } from '@entities/message'

@ObjectType()
export class MessageResponse {
  @Field(() => Message, { nullable: false })
  message: Message
}

@ObjectType()
export class MessagesResponse {
  @Field(() => [Message], { nullable: false })
  messages: Message[]
}
