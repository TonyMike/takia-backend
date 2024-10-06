import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from "class-validator";
import { IProduct } from "src/@types/products";

export class CreateUserDto {
  id?: string;

  @IsEnum(["user", "admin"], { message: "Role must be either 'user' or 'admin'" })
  @IsOptional()
  role: "user" | "admin";

  @IsEmail({}, { message: "Email must be a valid email" })
  @IsNotEmpty({ message: "Email is required" })
  email: string;

  @IsString({ message: "Password must be a string" })
  @IsOptional()
  password: string;

  @IsString({ message: "Business name must be a string" })
  @IsOptional()
  businessName: string;

  @IsNumber({}, { message: "Phone number must be a number" })
  @IsOptional()
  phoneNumber: number;

  @IsUrl({}, { message: "Whatsapp link must be a valid URL" })
  @IsOptional()
  whatsappLink: string;

  @IsUrl({}, { message: "Instagram link must be a valid URL" })
  @IsOptional()
  instagramLink: string;

  @IsUrl({}, { message: "Twitter link must be a valid URL" })
  @IsOptional()
  twitterLink: string;

  @IsString({ message: "Full name must be a string" })
  @IsNotEmpty({ message: "Full name is required" })
  fullName: string;

  @IsUrl({}, { message: "Profile picture must be a valid URL" })
  @IsOptional()
  profilePicture: string;

  @IsBoolean({ message: "isGoogleAuth must be a boolean" })
  @IsOptional()
  isGoogleAuth: boolean

  createdAt: Date;
  updatedAt: Date;

  @IsOptional()
  products?: IProduct[];
}