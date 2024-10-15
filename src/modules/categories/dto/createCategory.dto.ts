import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

/**
 * Data Transfer Object for creating a new Category.
 *
 * This DTO validates the input data for creating a category, ensuring it meets the required format.
 */
export class CreateCategoryDto {
  /**
   * Name of the category.
   *
   * - Must be a non-empty string.
   * - This property is required to create a new category.
   *
   * @example "Electronics"
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
