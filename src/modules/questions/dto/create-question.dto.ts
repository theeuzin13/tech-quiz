import { ApiProperty } from "@nestjs/swagger";

export class CreateQuestionDto {
  @ApiProperty({ example: "What is the capital of France?", description: "The question description" })
  description: string;

  @ApiProperty({ example: "Geography", description: "The category of the question" })
  categoryId: string;
}
