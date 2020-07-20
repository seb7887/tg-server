import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'
import { IsEmail } from 'class-validator'
import * as bcrypt from 'bcryptjs'

@Entity({ name: 'users' })
@ObjectType()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string

  @Field()
  @Column({ unique: true, nullable: false })
  @IsEmail()
  email: string

  @Field()
  @Column({ nullable: false })
  name: string

  @Column({ nullable: false })
  password: string
  @BeforeInsert()
  hashPassword() {
    const salt = bcrypt.genSaltSync(10)
    this.password = bcrypt.hashSync(this.password, salt)
  }

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
