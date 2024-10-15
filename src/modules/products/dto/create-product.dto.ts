import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  price: number;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  stock: boolean;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  @ApiProperty()
  imgUrl: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  sale: boolean;
}
