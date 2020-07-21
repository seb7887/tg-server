import { User } from '@entities/user'

export interface Headers {
  headers?: {
    [key: string]: any
    authorization?: string
  }
}

export interface Context {
  req: Record<string, any> & Headers
  currentUser: User
}
