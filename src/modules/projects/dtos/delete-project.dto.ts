import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteProjectDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
