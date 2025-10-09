import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @Length(6, 10, {
    message: 'A Palavra passe deve ter no mínimo 6 caracteres!',
  })
  @ApiProperty()
  password: string;
}
