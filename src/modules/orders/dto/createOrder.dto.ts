import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for specifying product IDs within an order.
 *
 * Each object represents a product uniquely identified by its UUID
 * and includes the desired quantity for that product.
 */
class ProductIDDto {
  /**
   * The unique identifier for a product.
   *
   * - Must be a valid UUID.
   * - This field is required.
   *
   * @example "f47ac10b-58cc-4372-a567-0e02b2c3d479"
   */
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'UUID of the product to include in the order.',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  })
  id: string;

  /**
   * Quantity of the product to include in the order.
   *
   * - Must be an integer.
   * - Minimum value is 1.
   *
   * @example 2
   */
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Quantity of the product to include in the order.',
    example: 2,
  })
  quantity: number;
}

/**
 * Data Transfer Object for Creating a New Order.
 *
 * This DTO is used to ensure that new order creation requests contain the required fields.
 */
export class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'UUID of the user placing the order.',
    example: '97c2d4b2-128c-4f94-868e-cefb78114828',
  })
  userID: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ProductIDDto)
  @ApiProperty({
    description:
      'Array of product UUIDs and their quantities to include in the order.',
    type: [ProductIDDto],
    example: [
      { id: 'd98dfbc5-f477-4c67-95db-e612b65c483a', quantity: 2 },
      { id: 'a542ad00-c53b-4d28-b76b-7974207a47b5', quantity: 1 },
    ],
  })
  productsID: ProductIDDto[];
}
