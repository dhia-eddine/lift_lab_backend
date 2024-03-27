import {
  IsNotEmpty,
  IsString,
  IsEmail,
  Matches,
  IsBoolean,
} from 'class-validator';

export class CreateCoachDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[0-9]{8}$/, { message: 'Mobile number must be 8 digits long' })
  mobile: string;

  @IsString()
  specialist: string;

  @IsBoolean()
  active?: boolean;
}
