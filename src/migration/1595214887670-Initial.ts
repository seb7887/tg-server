import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm'

export class Initial1595214887670 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)

    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            default: 'uuid_generate_v4()',
            generationStrategy: 'uuid',
            isUnique: true,
            isPrimary: true,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: `timezone('utc'::text, now())`,
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: `timezone('utc'::text, now())`,
          },
        ],
      }),
      true
    )

    await queryRunner.createIndex(
      'users',
      new TableIndex({
        name: 'IDX_USER_EMAIL',
        columnNames: ['email'],
      })
    )

    await queryRunner.createTable(
      new Table({
        name: 'messages',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            default: 'uuid_generate_v4()',
            generationStrategy: 'uuid',
            isUnique: true,
            isPrimary: true,
          },
          {
            name: 'content',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: `timezone('utc'::text, now())`,
          },
          {
            name: 'sender',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'recipient',
            type: 'uuid',
            isNullable: false,
          },
        ],
      }),
      true
    )

    await queryRunner.createForeignKey(
      'messages',
      new TableForeignKey({
        columnNames: ['sender'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      })
    )

    await queryRunner.createForeignKey(
      'messages',
      new TableForeignKey({
        columnNames: ['recipient'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      })
    )

    await queryRunner.createTable(
      new Table({
        name: 'chats',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            default: 'uuid_generate_v4()',
            generationStrategy: 'uuid',
            isUnique: true,
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
        ],
      }),
      true
    )

    await queryRunner.createTable(
      new Table({
        name: 'chat_messages',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            default: 'uuid_generate_v4()',
            generationStrategy: 'uuid',
            isUnique: true,
            isPrimary: true,
          },
          {
            name: 'chat_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'message_id',
            type: 'uuid',
            isNullable: false,
          },
        ],
      }),
      true
    )

    await queryRunner.createForeignKey(
      'chat_messages',
      new TableForeignKey({
        columnNames: ['chat_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'chats',
      })
    )

    await queryRunner.createForeignKey(
      'chat_messages',
      new TableForeignKey({
        columnNames: ['message_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'messages',
      })
    )

    await queryRunner.createTable(
      new Table({
        name: 'chat_participants',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            default: 'uuid_generate_v4()',
            generationStrategy: 'uuid',
            isUnique: true,
            isPrimary: true,
          },
          {
            name: 'chat_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'participant',
            type: 'uuid',
            isNullable: false,
          },
        ],
      }),
      true
    )

    await queryRunner.createForeignKey(
      'chat_participants',
      new TableForeignKey({
        columnNames: ['chat_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'chats',
      })
    )

    await queryRunner.createForeignKey(
      'chat_participants',
      new TableForeignKey({
        columnNames: ['participant'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('chat_participants')
    await queryRunner.dropTable('chat_messages')
    await queryRunner.dropTable('chats')
    await queryRunner.dropTable('messages')
    await queryRunner.dropIndex('users', 'IDX_USER_EMAIL')
    await queryRunner.dropTable('users')
  }
}
