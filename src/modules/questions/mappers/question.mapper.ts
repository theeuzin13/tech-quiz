import { CreateQuestionDto } from "../dto/create-question.dto";
import { ResponseQuestionDto } from "../dto/response-question.dto";
import { QuestionEntity } from "../entities/question.entity";

export class QuestionMapper {
  static toResponseDto(dto: QuestionEntity): ResponseQuestionDto {
    const entity = new ResponseQuestionDto();
    entity.uuid = dto.uuid;
    entity.description = dto.description;
    entity.categoryId = dto.categoryId;
    entity.createdAt = dto.created_at;
    return entity;
  }
}
