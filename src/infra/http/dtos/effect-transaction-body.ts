import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class EffectTransactionBody {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  recipientKey: string;

  @IsString()
  @IsNotEmpty()
  senderKey: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  transactionId: string;

  @IsNumber()
  @IsNotEmpty()
  value: number;
}
