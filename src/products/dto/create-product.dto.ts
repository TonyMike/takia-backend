import {
  IsBoolean,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsBoolean()
  negotiable: boolean;

  @IsNotEmpty()
  @IsIn(['new', 'used'])
  condition: 'new' | 'used';

  @IsNotEmpty()
  @IsInt()
  categoryId: number; // Changed to categoryId

  @IsInt() // Changed to IsInt to match the categoryId type
  subCategoryId: number; // Changed to subCategoryId

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  school: string; // Made optional

  @IsNotEmpty()
  @IsString({ each: true })
  images: string[];
  // Made optional
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
