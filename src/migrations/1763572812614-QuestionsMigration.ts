import { MigrationInterface, QueryRunner } from "typeorm";

export class QuestionsMigration1763572812614 implements MigrationInterface {
    name = 'QuestionsMigration1763572812614'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "questions" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "description" character varying NOT NULL, "category_id" uuid NOT NULL, CONSTRAINT "PK_64caa00822d29e30eba1f273db5" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "FK_6004e23393f2a8efe414480b75d" FOREIGN KEY ("category_id") REFERENCES "categories"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "FK_6004e23393f2a8efe414480b75d"`);
        await queryRunner.query(`DROP TABLE "questions"`);
    }

}
