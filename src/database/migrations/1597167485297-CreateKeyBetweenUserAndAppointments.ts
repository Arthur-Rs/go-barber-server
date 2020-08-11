// eslint-disable-next-line no-unused-vars
import { MigrationInterface, QueryRunner, TableForeignKey, TableColumn } from 'typeorm'

export default class CreateKeyBetweenUserAndAppointments1597167485297 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('appointments', new TableColumn({
      name: 'provider_id',
      type: 'uuid',
      isNullable: true,
      default: 'NULL'
    }))

    await queryRunner.createForeignKey('appointments', new TableForeignKey({
      name: 'users_appointments',
      referencedTableName: 'users',
      referencedColumnNames: ['id'],
      columnNames: ['provider_id'],
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'provider_id')
    await queryRunner.dropForeignKey('appointments', 'users_appointments')
  }
}
