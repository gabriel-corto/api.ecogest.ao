import { IsEmail, IsEnum, IsNotEmpty, Length } from 'class-validator';
import { entityTypeEnum } from '@prisma/client';

export class CreateUserDTO {
  @IsNotEmpty()
  @Length(3, 20)
  name: string;

  @IsNotEmpty()
  nif: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsEnum(entityTypeEnum)
  entityType: entityTypeEnum;

  @IsNotEmpty()
  @Length(6)
  password: string;
}
