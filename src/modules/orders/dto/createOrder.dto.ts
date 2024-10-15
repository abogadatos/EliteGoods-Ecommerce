import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for specifying product IDs within an order.
 *
 * Each object represents a product uniquely identified by its UUID.
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
}

/**
 * Data Transfer Object for Creating a New Order.
 *
 * This DTO is used to ensure that new order creation requests contain the required fields.
 */
export class CreateOrderDto {
  /**
   * Unique identifier for the user placing the order.
   *
   * - Must be a valid UUID.
   * - This field is required.
   *
   * @example "97c2d4b2-128c-4f94-868e-cefb78114828"
   */
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'UUID of the user placing the order.',
    example: '97c2d4b2-128c-4f94-868e-cefb78114828',
  })
  userID: string;

  /**
   * List of Product IDs to include in the order.
   *
   * - Must be an array containing at least one product ID.
   * - Each product ID must be a valid UUID.
   *
   * @example [{ "id": "d98dfbc5-f477-4c67-95db-e612b65c483a" }, { "id": "a542ad00-c53b-4d28-b76b-7974207a47b5" }]
   */
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ProductIDDto)
  @ApiProperty({
    description: 'Array of product UUIDs to include in the order.',
    type: [ProductIDDto],
    example: [
      { id: 'd98dfbc5-f477-4c67-95db-e612b65c483a' },
      { id: 'a542ad00-c53b-4d28-b76b-7974207a47b5' },
    ],
  })
  productsID: ProductIDDto[];
}
