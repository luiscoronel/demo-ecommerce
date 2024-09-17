import { MigrationInterface, QueryRunner } from "typeorm";

export class Prueba1726576165506 implements MigrationInterface {
    name = 'Prueba1726576165506'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "description" character varying(50) NOT NULL, "price" numeric(10,2) NOT NULL, "stock" integer NOT NULL, "imgUrl" text NOT NULL DEFAULT '../../utils/sin-foto2.png', "categoriesId" uuid, CONSTRAINT "UQ_4c9fb58de893725258746385e16" UNIQUE ("name"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orderDetail" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" numeric(10,2) NOT NULL, CONSTRAINT "PK_39c7d4260520bd85b6fd76f6443" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL, "orderDetailId" uuid, "user_id" uuid, CONSTRAINT "REL_749e30f71cc0d2d95f8546f459" UNIQUE ("orderDetailId"), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(50) NOT NULL, "name" character varying(50) NOT NULL, "password" character varying(128) NOT NULL, "address" character varying NOT NULL, "phone" character varying(15) NOT NULL, "country" character varying(50) NOT NULL, "city" character varying(50) NOT NULL, "isAdmin" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_products" ("order_detail_id" uuid NOT NULL, "product_id" uuid NOT NULL, CONSTRAINT "PK_f76303c7e1270b8a27d9578133d" PRIMARY KEY ("order_detail_id", "product_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4861ca361bba735e890173ef25" ON "order_products" ("order_detail_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_2d58e8bd11dc840b39f99824d8" ON "order_products" ("product_id") `);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_3a9ea78a0f8110a3618098dc39b" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_749e30f71cc0d2d95f8546f4592" FOREIGN KEY ("orderDetailId") REFERENCES "orderDetail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_a922b820eeef29ac1c6800e826a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_products" ADD CONSTRAINT "FK_4861ca361bba735e890173ef253" FOREIGN KEY ("order_detail_id") REFERENCES "orderDetail"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "order_products" ADD CONSTRAINT "FK_2d58e8bd11dc840b39f99824d84" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_products" DROP CONSTRAINT "FK_2d58e8bd11dc840b39f99824d84"`);
        await queryRunner.query(`ALTER TABLE "order_products" DROP CONSTRAINT "FK_4861ca361bba735e890173ef253"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_a922b820eeef29ac1c6800e826a"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_749e30f71cc0d2d95f8546f4592"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_3a9ea78a0f8110a3618098dc39b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2d58e8bd11dc840b39f99824d8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4861ca361bba735e890173ef25"`);
        await queryRunner.query(`DROP TABLE "order_products"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "orderDetail"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
