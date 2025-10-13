import { DocumentTypeEnum } from '@prisma/client';
import { IsEmpty, IsEnum, IsNotEmpty } from 'class-validator';

export class CreateIdocDto {
  @IsEmpty()
  url: string;

  @IsNotEmpty()
  @IsEnum(DocumentTypeEnum)
  type: DocumentTypeEnum;
}
