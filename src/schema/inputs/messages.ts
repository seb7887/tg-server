import { InputType, Field } from 'type-graphql'

@InputType()
export class NewMessageInput {
  @Field()
  content: string

  @Field()
  senderId: string

  @Field()
  recipientId: string
}
