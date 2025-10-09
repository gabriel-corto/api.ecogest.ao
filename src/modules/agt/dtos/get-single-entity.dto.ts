import { IsNotEmpty } from 'class-validator';

export class GetSingleEntityDto {
  @IsNotEmpty()
  nif: string;
}
