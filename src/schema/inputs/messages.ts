import { InputType, Field } from 'type-graphql'

@InputType()
export class NewMessageInput {
  @Field()
  content: string

  @Field()
  chatId: string

  @Field()
  recipientId: string
}
