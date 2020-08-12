import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddColumnAvatarInUser1597202905693 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'avatar_path',
        type: 'varchar',
        isUnique: true,
        isNullable: true,
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'avatar_path')
  }
}
