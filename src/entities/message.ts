import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  CreateDateColumn,
} from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'
import { User } from '@entities/user'

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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date
}
