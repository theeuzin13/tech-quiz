import { BaseModel } from "src/common/entities/base.entity";
import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { QuestionEntity } from "src/modules/questions/entities/question.entity";

@Entity({ name: "alternatives" })
export class AlternativeEntity extends BaseModel {
  @Column({ name: "question_id", nullable: false })
  questionId: string;

  @Column({ name: "text", nullable: false })
  text: string;

  @Column({ name: "is_correct", nullable: false })
  isCorrect: boolean;

  @ManyToOne(() => QuestionEntity, (question) => question.alternatives)
  @JoinColumn({ name: "question_id" })
  question: QuestionEntity;
}
