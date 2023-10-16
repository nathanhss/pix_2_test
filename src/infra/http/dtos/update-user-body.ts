import { IsOptional, IsString } from 'class-validator';

export class UpdateUserBody {
  @IsString()
  @IsOptional()
  birthDate?: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  mothersName?: string;
}
