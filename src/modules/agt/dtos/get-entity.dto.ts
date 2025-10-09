import { IsNotEmpty } from 'class-validator';

export class GetEntityDTO {
  @IsNotEmpty()
  nif: string;
}
