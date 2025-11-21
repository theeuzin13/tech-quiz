import { DataSource } from "typeorm";
import 'dotenv/config';
import { CategoryEntity } from "src/modules/categories/entities/category.entity";
import { QuestionEntity } from "src/modules/questions/entities/question.entity";
import { AlternativeEntity } from "src/modules/alternatives/entities/alternative.entity";
import { UserEntity } from "src/common/entities/user.entity";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? "5432"),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: false,
    entities: [CategoryEntity, QuestionEntity, AlternativeEntity, UserEntity],
    migrations: ["src/migrations/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],
});