import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  //   JoinColumn,
  OneToMany,
} from 'typeorm';
import { Product } from './product.entity';

/**
 * Represents a category of products within the e-commerce platform.
 * Each category can contain multiple products, facilitating product grouping and filtering.
 */
@Entity({
  name: 'categories',
})
export class Category {
  /**
   * Unique identifier for each category.
   *
   * @remarks
   * Automatically generated as a UUID string by the database.
   *
   * @example "e784fc08-b28f-4a60-8d89-1e7b4b6c2f3d"
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Name of the category, used to label and identify product groups.
   *
   * @remarks
   * - Must be unique to avoid duplicate categories.
   * - Cannot exceed 50 characters, maintaining consistency across the platform.
   * - Non-nullable, ensuring each category has a name.
   *
   * @example "Electronics"
   */
  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    nullable: false,
  })
  name: string;

  /**
   * List of products that belong to this category.
   *
   * @remarks
   * Establishes a one-to-many relationship with the Product entity.
   * Categories serve as containers for related products, enabling organized product listings.
   *
   * @example
   * [
   *   { id: "a34f7b89-0f45-4b3a-b893-1b7d9c7c8d5e", name: "Laptop" },
   *   { id: "c21a9b87-8c4e-4c2e-8128-5f8f9b6b9f4d", name: "Smartphone" }
   * ]
   */
  @OneToMany(() => Product, (product) => product.category)
  //   @JoinColumn({ name: 'products_id' })
  products: Product[];
}
