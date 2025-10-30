import { SectorEnum } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  name: string;

  @IsEnum(SectorEnum)
  sector: SectorEnum;

  @IsNotEmpty()
  slug: string;

  @IsNotEmpty()
  locale: string;
}
