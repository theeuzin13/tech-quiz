import { BaseModel } from "src/common/entities/base.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: "categories" })
export class CategoryEntity extends BaseModel {
  @Column({ name: "name", nullable: false})
  name: string;
}
