import { ApiProperty } from '@nestjs/swagger';
import { entityTypeEnum, Role, StatusEnum } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class UpdateIdentificationDto {
  @ApiProperty({
    enum: StatusEnum,
  })
  @IsEnum(StatusEnum)
  status: StatusEnum;
}

export class GovernmentEntityDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  nif: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ enum: entityTypeEnum })
  entityType: entityTypeEnum;

  @ApiProperty({ enum: Role })
  role: Role;

  @ApiProperty()
  createdAt: Date;
}

export class MetricsDto {
  @ApiProperty()
  total: number;

  @ApiProperty()
  pendings: number;

  @ApiProperty()
  approveds: number;

  @ApiProperty()
  rejecteds: number;
}
