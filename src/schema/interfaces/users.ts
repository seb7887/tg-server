import { InterfaceType, Field, ObjectType } from 'type-graphql'
import { User } from '@entities/user'

@InterfaceType()
export abstract class Response {
  @Field(() => User, { nullable: true })
  user?: User

  @Field({ nullable: true })
  jwt?: string
}

@ObjectType({ implements: Response })
export class SignUpResponse implements Response {
  user?: User
  jwt?: string

  @Field()
  message: string
}
