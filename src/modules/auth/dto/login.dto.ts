import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  username: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(50)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
    message:
      'Password must contain uppercase and lowercase letters, numbers and special characters',
  })
  password: string;
}
