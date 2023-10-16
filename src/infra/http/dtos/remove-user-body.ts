import { IsOptional, IsString } from 'class-validator';

export class RemoveUserBody {
  @IsString()
  @IsOptional()
  birthDate?: string;

  @IsString()
  @IsOptional()
  cpf?: string;
}
