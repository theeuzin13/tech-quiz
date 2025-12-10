import { MigrationInterface, QueryRunner } from "typeorm";

export class IconMigrationUpdate1765331702116 implements MigrationInterface {
    name = 'IconMigrationUpdate1765331702116'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "FK_6004e23393f2a8efe414480b75d"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "icon" character varying`);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "FK_6004e23393f2a8efe414480b75d" FOREIGN KEY ("category_id") REFERENCES "categories"("uuid") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "FK_6004e23393f2a8efe414480b75d"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "icon"`);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "FK_6004e23393f2a8efe414480b75d" FOREIGN KEY ("category_id") REFERENCES "categories"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
