import { AuthenticationError } from 'apollo-server'
import { MiddlewareFn } from 'type-graphql'
import { verify } from 'jsonwebtoken'
import { Context } from '@lib/context'
import { User } from '@entities/user'

interface JwtPayload {
  id: string
}

export const isAuthenticated: MiddlewareFn<Context> = async (
  { context },
  next
) => {
  const authorization = context.req.headers?.authorization

  try {
    if (!authorization) {
      throw new Error('Not authenticated')
    }

    const jwt = authorization.split(' ')[1]
    const { id } = verify(jwt, process.env.SECRET || '') as JwtPayload

    if (!id) {
      throw new Error('Not authenticated')
    }

    const currentUser = await User.findOne(id)

    if (!currentUser) {
      throw new Error('Not authenticated')
    }

    context.currentUser = currentUser

    return next()
  } catch (err) {
    throw new AuthenticationError(err.message)
  }
}
