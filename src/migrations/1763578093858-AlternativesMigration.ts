import { MigrationInterface, QueryRunner } from "typeorm";

export class AlternativesMigration1763578093858 implements MigrationInterface {
    name = 'AlternativesMigration1763578093858'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "alternatives" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "question_id" uuid NOT NULL, "text" character varying NOT NULL, "is_correct" boolean NOT NULL, CONSTRAINT "PK_09a5e3d815cafe081526285e180" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`ALTER TABLE "alternatives" ADD CONSTRAINT "FK_789e57f8c7f53c0a425393deec5" FOREIGN KEY ("question_id") REFERENCES "questions"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "alternatives" DROP CONSTRAINT "FK_789e57f8c7f53c0a425393deec5"`);
        await queryRunner.query(`DROP TABLE "alternatives"`);
    }

}
