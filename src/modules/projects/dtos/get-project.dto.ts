import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetProjectDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
