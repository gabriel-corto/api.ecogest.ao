import { entityTypeEnum } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, Length, Matches } from 'class-validator';

import { nifRegex } from '@/common/dtos/angolan-nif.dto';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @IsNotEmpty()
  @Length(3, 50, {
    message: 'Nome Inválido',
  })
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @Matches(nifRegex, {
    message: 'NIF Ou BI Inválido!',
  })
  @ApiProperty()
  nif: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsEnum(entityTypeEnum)
  @ApiProperty({ enum: entityTypeEnum })
  entityType: entityTypeEnum;

  @IsNotEmpty()
  @Length(6, 10, {
    message: 'A Palavra passe deve ter no mínimo 6 caracteres!',
  })
  @ApiProperty()
  password: string;
}
