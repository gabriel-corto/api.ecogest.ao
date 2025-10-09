import { IsNotEmpty, Matches } from 'class-validator';

export const nifRegex = /^(?:\d{10}|\d{9}[A-Z]{2}\d{3})$/;

export class AngolanNifDto {
  public readonly nifRegex;
  @IsNotEmpty()
  @Matches(nifRegex, {
    message: 'NIF Ou BI Inválido!',
  })
  nif: string;
}
