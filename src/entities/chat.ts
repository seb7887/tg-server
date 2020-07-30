import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'
import { Message } from '@entities/message'
import { User } from '@entities/user'

@Entity({ name: 'chats' })
@ObjectType()
export class Chat extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: string

  @Column()
  @Field()
  name: string

  @Field(() => [Message])
  @OneToMany(type => Message, msg => msg.chat)
  messages: Message[]

  @Field(() => [User])
  @ManyToMany(type => User)
  @JoinTable({
    name: 'chat_participants',
    joinColumn: {
      name: 'chat_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'participant',
      referencedColumnName: 'id',
    },
  })
  participants: User[]

  @Field(() => Message)
  lastMessage: Message
}
