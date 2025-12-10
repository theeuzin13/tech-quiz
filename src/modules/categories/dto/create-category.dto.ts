import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, MinLength } from "class-validator";

export class CreateCategoryDto {
  @ApiProperty({ example: "Science", description: "The name of the category" })
  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: "Category name must be at least 2 characters long" })
  name: string;
  
  @ApiProperty({ example: "fa-solid fa-code", description: "The icon URL of the category", required: false })
  @IsString()
  icon?: string;
}
