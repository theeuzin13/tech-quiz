import { ResponseAlternativeDto } from "../dto/response-alternative.dto";
import { AlternativeEntity } from "../entities/alternative.entity";

export class AlternativeMapper {
  static toResponseDto(entity: AlternativeEntity): ResponseAlternativeDto {
    const dto = new ResponseAlternativeDto();
    dto.uuid = entity.uuid;
    dto.text = entity.text;
    dto.isCorrect = entity.isCorrect;
    dto.questionId = entity.questionId;
    dto.createdAt = entity.created_at;
    return dto;
  }

}