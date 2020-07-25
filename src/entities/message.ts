import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  CreateDateColumn,
} from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'
import { User } from '@entities/user'
import { Chat } from '@entities/chat'

@Entity({ name: 'messages' })
@ObjectType()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: string

  @Column()
  @Field()
  content: string

  @Field(() => User)
  @OneToOne(() => User)
  sender: User
  @Column({ name: 'sender_id' })
  senderId: string

  @Field(() => User)
  @OneToOne(() => User)
  recipient: User
  @Column({ name: 'recipient_id' })
  recipientId: string

  @ManyToOne(() => Chat)
  chat: Chat
  @Column({ name: 'chat_id' })
  chatId: string

  @Field(() => Date)
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date
}
