import { nifRegex } from '@/common/dtos/angolan-nif.dto';
import { ApiProperty } from '@nestjs/swagger';

import { entityTypeEnum } from '@prisma/client';
import { IsEnum, IsNotEmpty, Length, Matches } from 'class-validator';

export class CreateEntityDto {
  @IsNotEmpty()
  @Length(3, 50)
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @Matches(nifRegex, {
    message: 'NIF ou BI Inválido!',
  })
  @ApiProperty()
  nif: string;

  @IsNotEmpty()
  @IsEnum(entityTypeEnum, {
    message: 'A entidade só pode ser SINGULAR ou COMPANY',
  })
  @ApiProperty({
    enum: entityTypeEnum,
  })
  entityType: entityTypeEnum;
}
