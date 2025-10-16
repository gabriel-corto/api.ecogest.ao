import { ApiProperty } from '@nestjs/swagger';
import { StatusEnum } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class UpdateIdentificationDto {
  @ApiProperty({
    enum: StatusEnum,
  })
  @IsEnum(StatusEnum)
  status: StatusEnum;
}
