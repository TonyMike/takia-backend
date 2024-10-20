import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateUserDto {

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  role: 'user' | 'admin'; // Enum-like type for role

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  businessName?: string;

  @Matches(/^0\d{10}$/, {
    message:
      'Phone number must be in the format: 0XXXXXXXXXX (11 digits total)',
  })
  phoneNumber: string;

  @IsOptional()
  @IsString()
  whatsappLink?: string;

  @IsOptional()
  @IsString()
  instagramLink?: string;

  @IsOptional()
  @IsString()
  twitterLink?: string;

  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsOptional()
  @IsString()
  profilePicture?: string;

  @IsOptional()
  @IsBoolean()
  isGoogleAuth?: boolean;
}
