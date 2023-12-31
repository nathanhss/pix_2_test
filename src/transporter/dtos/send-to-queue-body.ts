import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SendToQueueBody {
  @IsString()
  @IsNotEmpty()
  recipientKey: string;

  @IsString()
  @IsNotEmpty()
  senderKey: string;

  @IsNumber()
  @IsNotEmpty()
  value: number;
}
