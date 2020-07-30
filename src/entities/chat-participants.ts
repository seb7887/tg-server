import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({ name: 'chat_participants' })
export class ChatParticipants extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  participant: string

  @Column({ name: 'chat_id' })
  chatId: string
}
