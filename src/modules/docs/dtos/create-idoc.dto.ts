import { DocumentTypeEnum } from '@prisma/client';
import { IsEmpty, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateIdocDto {
  @IsEmpty()
  url: string;

  @IsNotEmpty()
  @IsEnum(DocumentTypeEnum)
  type: DocumentTypeEnum;

  @IsOptional()
  @IsString()
  @IsUUID()
  userId: string;
}
