import { BaseModel } from "src/common/entities/base.entity";
import { AlternativeEntity } from "src/modules/alternatives/entities/alternative.entity";
import { CategoryEntity } from "src/modules/categories/entities/category.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity({ name: "questions" })
export class QuestionEntity extends BaseModel {
  @Column({ name: "description", nullable: false })
  description: string;
  
  @Column({ name: "category_id", nullable: false })
  categoryId: string;

  @ManyToOne(() => CategoryEntity)
  @JoinColumn({ name: "category_id" })
  category: CategoryEntity;

  @OneToMany(() => AlternativeEntity, (alternative) => alternative.question)
  alternatives: AlternativeEntity[];
}
