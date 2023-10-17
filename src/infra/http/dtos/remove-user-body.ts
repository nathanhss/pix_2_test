import { IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class RemoveUserBody {
  @ApiProperty()
  @IsString()
  @IsOptional()
  birthDate?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  cpf?: string;
}
