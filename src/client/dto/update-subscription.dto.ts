import { IsDate, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class UpdateSubscriptionDto {
  @IsOptional()
  @IsDate()
  date?: Date;

  @IsOptional()
  @IsDate()
  endDate?: Date;

  @IsOptional()
  @IsNumber()
  fees?: number;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
