import { IsNotEmpty, IsDate, IsNumber, IsBoolean } from 'class-validator';

export class CreateSubscriptionDto {
  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsDate()
  endDate: Date;

  @IsNotEmpty()
  @IsNumber()
  fees: number;

  @IsNotEmpty()
  @IsBoolean()
  active: boolean;
}
