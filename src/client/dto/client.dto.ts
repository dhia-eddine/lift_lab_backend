import { IsNotEmpty, IsString, IsEmail, Matches } from 'class-validator';

export class CreateClientDto {
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
  address: string;
}
