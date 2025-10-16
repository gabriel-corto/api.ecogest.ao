import {
  DocumentStatusEnum,
  DocumentTypeEnum,
  entityTypeEnum,
  type Idoc,
  Role,
} from '@prisma/client';
import { IsEmail, IsEmpty, IsNotEmpty, IsUUID, Length, Matches } from 'class-validator';

import { nifRegex } from '@/common/dtos/angolan-nif.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @Length(3, 50, {
    message: 'Nome Inválido',
  })
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @Matches(nifRegex, {
    message: 'NIF Ou BI Inválido!',
  })
  @ApiProperty()
  nif: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsEmpty()
  role: Role | null;

  @IsNotEmpty()
  @Length(6, 10, {
    message: 'A Palavra passe deve ter no mínimo 6 caracteres!',
  })
  @ApiProperty()
  password: string;
}

export class UserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  nif: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  entityType: entityTypeEnum;

  @ApiProperty()
  isEmailVerified: boolean | null;

  @ApiProperty()
  isIdentityVerified: boolean | null;

  @ApiProperty({
    example: Role,
    enum: Role,
  })
  role: Role | null;
}
export class IdentificationDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  nif: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  entityType: entityTypeEnum;

  @ApiProperty()
  isEmailVerified: boolean | null;

  @ApiProperty()
  isIdentityVerified: boolean | null;

  @ApiProperty({
    example: Role.ADMIN,
    enum: Role,
  })
  role: Role;

  @ApiProperty({
    example: {
      id: 'string',
      url: 'string',
      type: DocumentTypeEnum.COMERCIAL_LICENSE,
      status: DocumentStatusEnum.PENDING,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  })
  idoc: Idoc;
}

export class ParamDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
