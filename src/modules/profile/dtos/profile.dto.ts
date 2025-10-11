import { ApiProperty } from '@nestjs/swagger';

export class ProfileDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  nif: string;

  @ApiProperty()
  entityType: string;
}
