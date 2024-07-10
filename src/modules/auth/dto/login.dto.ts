import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class LoginDTO {
  @ApiProperty({ example: 'shelby' })
  @Length(5, 25)
  username: string;

  @ApiProperty({ example: 'peakyblinders' })
  password: string;
}
