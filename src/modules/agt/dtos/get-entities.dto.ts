import { ApiProperty } from '@nestjs/swagger';
import { entityTypeEnum } from '@prisma/client';

export class GetEntitiesDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  nif: string;

  @ApiProperty({
    enum: entityTypeEnum,
  })
  entityType: entityTypeEnum;

  @ApiProperty({
    example: new Date().toISOString(),
  })
  createdAt: string;

  @ApiProperty({
    example: new Date().toISOString(),
  })
  updatedAt: string;
}
