import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsBoolean()
  negotiable: boolean;

  @IsString()
  condition: 'new' | 'used';

  @IsString()
  category: string;

  @IsString()
  subCategory: string;

  @IsString()
  state: string;

  @IsString()
  school: string;

  @IsString()
  images: string;

  @IsNumber()
  price: number;

  @IsString()
  userId: string;
}
