import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePixKeyBody {
  @IsString()
  @IsNotEmpty()
  cpf: string;

  @IsString()
  @IsNotEmpty()
  keyName: string;
}
