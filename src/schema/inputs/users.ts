import { InputType, Field } from 'type-graphql'

@InputType()
export class NewUserInput {
  @Field()
  email: string

  @Field()
  name: string

  @Field()
  password: string
}
