import { Field, ObjectType } from 'type-graphql'
import { Message } from '@entities/message'

@ObjectType()
export class MessageResponse {
  @Field({ nullable: false })
  message: Message
}

@ObjectType()
export class MessagesResponse {
  @Field({ nullable: false })
  messages: Message[]
}
