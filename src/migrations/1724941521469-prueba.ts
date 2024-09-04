import { MigrationInterface, QueryRunner } from "typeorm";

export class Prueba1724941521469 implements MigrationInterface {
    name = 'Prueba1724941521469'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "isSuperAdmin" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isSuperAdmin"`);
    }

}
