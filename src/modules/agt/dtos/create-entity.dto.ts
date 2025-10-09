import { ApiProperty } from '@nestjs/swagger';
import { entityTypeEnum } from '@prisma/client';
import { IsEnum, IsNotEmpty, Length } from 'class-validator';

export class CreateEntityDTO {
  @IsNotEmpty()
  @Length(3, 50)
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  nif: string;

  @IsNotEmpty()
  @IsEnum(entityTypeEnum)
  @ApiProperty({
    enum: entityTypeEnum,
  })
  entityType: entityTypeEnum;
}
