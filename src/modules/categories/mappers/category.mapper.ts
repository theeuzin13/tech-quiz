import { ResponseCategoryDto } from "../dto/response-category.dto";
import { CategoryEntity } from "../entities/category.entity";

export class CategoryMapper {
  static toResponseDto(entity: CategoryEntity): ResponseCategoryDto {
    const dto = new ResponseCategoryDto();
    dto.uuid = entity.uuid;
    dto.name = entity.name;
    dto.icon = entity.icon;
    dto.createdAt = entity.created_at;
    return dto;
  }

}