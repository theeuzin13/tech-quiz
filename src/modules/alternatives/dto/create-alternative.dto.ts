import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateAlternativeDto {
  @ApiProperty({ example: "Paris", description: "The alternative text" })
  @IsNotEmpty()
  @IsString()
  text: string;

  @ApiProperty({ example: "123e4567-e89b-12d3-a456-426614174000", description: "The ID of the question this alternative belongs to" })
  @IsNotEmpty()
  @IsString()
  questionId: string;

  @ApiProperty({ example: true, description: "Indicates whether this alternative is the correct answer" })
  @IsBoolean()
  isCorrect: boolean;
}
