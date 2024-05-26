import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class UpdateCoachDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  email?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9]{8}$/, { message: 'Mobile number must be 8 digits long' })
  mobile?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  specialty?: string;

  @IsBoolean()
  active?: boolean;
}
