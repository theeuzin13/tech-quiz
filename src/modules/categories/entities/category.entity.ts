import { BaseModel } from "src/common/entities/base.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { QuestionEntity } from "src/modules/questions/entities/question.entity";

@Entity({ name: "categories" })
export class CategoryEntity extends BaseModel {
  @Column({ name: "name", nullable: false})
  name: string;

  @Column({ name: "icon", nullable: true })
  icon?: string;

  @OneToMany(() => QuestionEntity, question => question.category)
  questions: QuestionEntity[];
}
