import { IsString, IsUrl, IsOptional, IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProductDTO {
  @IsString()
  @ApiProperty({ type: String, description: 'Id of category' })
  idCategory: string;

  @IsString()
  @ApiProperty({ type: String, description: 'Name of product' })
  name: string;

  @ApiProperty({
    description: 'URL image of image product',
    default: 'image.com',
  })
  @IsUrl(undefined)
  image: string;

  @IsString()
  @ApiProperty({ type: String, description: 'Description' })
  description: string;

  @IsString()
  @ApiProperty({ type: String, description: 'Product price' })
  productPrice: string;

  @IsString()
  @ApiProperty({ type: String, description: 'Quantity' })
  quantity: string;

  @IsString()
  @ApiProperty({ type: String, description: 'Size' })
  size: string;
}

export class UpdateProductDTO {
  @IsString()
  @ApiProperty({ type: String, description: 'Id of product' })
  idProduct: string;

  @IsString()
  @ApiProperty({ type: String, description: 'Id of product category' })
  idProductCategory: string;

  @IsString()
  @ApiProperty({ type: String, description: 'Id of category' })
  idCategory: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: 'Name of product' })
  name: string;

  @ApiProperty({
    description: 'URL image of image product',
    default: 'image.com',
  })
  @IsOptional()
  @IsUrl(undefined)
  image: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: 'Description' })
  description: string;

  @IsNumberString()
  @IsOptional()
  @ApiProperty({ type: String, description: 'Product price' })
  productPrice: string;

  @IsNumberString()
  @IsOptional()
  @ApiProperty({ type: String, description: 'Quantity' })
  quantity: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: 'Size' })
  size: string;
}
