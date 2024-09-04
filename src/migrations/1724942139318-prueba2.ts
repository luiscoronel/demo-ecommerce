import { MigrationInterface, QueryRunner } from "typeorm";

export class Prueba21724942139318 implements MigrationInterface {
    name = 'Prueba21724942139318'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isSuperAdmin"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "isSuperAdmin" boolean NOT NULL DEFAULT false`);
    }

}
