import { InputType, Field } from 'type-graphql'

@InputType()
export class NewChatInput {
  @Field()
  name: string

  @Field()
  to: string

  @Field()
  firstMessageContent: string
}
