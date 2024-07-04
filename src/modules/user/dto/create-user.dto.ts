import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString, Length } from 'class-validator';
export class CreateUserDto {
  @ApiProperty({ example: 'shelby' })
  @Length(6, 20)
  @IsString()
  username: string;

  @ApiProperty({ example: 'tommy.shelby@brummie.co.uk' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'peakyblinders' })
  @Length(4)
  password: string;

  @ApiProperty({ example: 'Tommy Shelby' })
  @IsString()
  @Length(1)
  fullname: string;
}