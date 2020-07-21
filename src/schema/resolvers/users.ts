import {
  Resolver,
  Mutation,
  Arg,
  Query,
  UseMiddleware,
  Ctx,
} from 'type-graphql'
import { validate } from 'class-validator'
import { sign } from 'jsonwebtoken'
import * as bcrypt from 'bcryptjs'
import { Context } from '@lib/context'
import { isAuthenticated } from '@lib/auth'
import { User } from '@entities/user'
import { SignUpResponse, LoginResponse } from '@interfaces/users'
import { NewUserInput, LoginInput } from '@inputs/users'

@Resolver(User)
export class UserResolver {
  @Query(returns => User)
  @UseMiddleware(isAuthenticated)
  me(@Ctx() { currentUser }: Context) {
    return currentUser
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
      const jwt = this.generateJWT(id)

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

  @Mutation(returns => LoginResponse)
  async signin(
    @Arg('loginData') { email, password }: LoginInput
  ): Promise<LoginResponse> {
    try {
      const user = await User.findOne({ where: { email } })

      if (!user) {
        throw new Error('User not found with the email address you provided')
      }

      const isValid = bcrypt.compareSync(password, user.password)

      if (!isValid) {
        throw new Error('Incorrect password. Try again')
      }

      const jwt = this.generateJWT(user.id)

      return {
        jwt,
        message: 'Welcome!',
      }
    } catch (err) {
      return {
        message: err.message,
      }
    }
  }

  generateJWT(id: string) {
    return sign({ id }, process.env.SECRET || '')
  }
}
