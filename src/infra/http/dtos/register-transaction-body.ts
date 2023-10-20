import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RegisterTransactionBody {
  @IsString()
  @IsNotEmpty()
  recipientKey: string;

  @IsString()
  @IsNotEmpty()
  senderKey: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsNumber()
  @IsNotEmpty()
  value: number;
}
