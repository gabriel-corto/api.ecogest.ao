import { SectorEnum } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  name: string;

  @IsEnum(SectorEnum)
  sector: SectorEnum;

  @IsNotEmpty()
  locale: string;
}
