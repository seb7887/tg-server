import { Resolver, Mutation, Arg, Query } from 'type-graphql'
import { validate } from 'class-validator'
import { sign } from 'jsonwebtoken'
import { User } from '@entities/user'
import { SignUpResponse } from '@interfaces/users'
import { NewUserInput } from '@inputs/users'

@Resolver(User)
export class UserResolver {
  @Query(() => String)
  hello() {
    return 'World!'
  }

  @Mutation(returns => SignUpResponse)
  async signup(
    @Arg('newUserData') { email, name, password }: NewUserInput
  ): Promise<SignUpResponse> {
    try {
      const user = new User()
      user.email = email
      user.name = name
      user.password = password

      const errors = await validate(user)
      if (errors.length > 0) {
        throw new Error('Input data validation failed')
      }
      const { id } = await user.save()
      const jwt = sign({ id }, process.env.SECRET || '')

      return {
        user,
        jwt,
        message: 'User created',
      }
    } catch (err) {
      return {
        message: err.message,
      }
    }
  }
}
