import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Category } from './category.entity';
import { OrderDetail } from './orderDetail.entity';

@Entity({
  name: 'products',
})
export class Product {
  /**
   * Unique identifier for the product, generated as a UUID.
   *
   * @example "5f8d04ae-1dc6-44de-a7ec-859b7bc05802"
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Product name.
   *
   * - Must be unique.
   * - Limited to a maximum of 50 characters.
   * - Cannot be null.
   *
   * @example "Wireless Keyboard"
   */
  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    nullable: false,
  })
  name: string;

  /**
   * Detailed description of the product.
   *
   * - Cannot be null.
   *
   * @example "A compact, wireless keyboard with ergonomic design and rechargeable battery."
   */
  @Column({
    type: 'text',
    nullable: false,
  })
  description: string;

  /**
   * Price of the product, stored as a decimal.
   *
   * - Cannot be null.
   * - Precision of 10 digits with 2 decimal places.
   *
   * @remarks
   * This is represented as `decimal` to accommodate prices with cents.
   *
   * @example 49.99
   */
  @Column({
    type: 'decimal',
    nullable: false,
    precision: 10,
    scale: 2,
  })
  price: number;

  /**
   * Quantity of the product available in stock.
   *
   * - Cannot be null.
   *
   * @example 150
   */
  @Column({
    type: 'integer',
    nullable: false,
  })
  stock: number;

  /**
   * URL of the product's image.
   *
   * - Optional.
   *
   * @remarks
   * Providing a URL allows the product to have an associated image for display purposes.
   *
   * @example "https://example.com/image.jpg"
   */
  @Column({
    type: 'text',
    // default: `https://i.pinimg.com/236x/01/08/e1/0108e1f80a1ac5bc885bc3117b63e89a.jpg`,
  })
  imgUrl: string;

  /**
   * Many-to-many relationship with OrderDetail entities.
   *
   * @remarks
   * Represents the orders that include this product.
   */
  @ManyToMany(() => OrderDetail, (orderDetails) => orderDetails.products)
  orderDetails: OrderDetail[];

  /**
   * Many-to-one relationship with the Category entity.
   *
   * - A product can belong to only one category.
   *
   * @remarks
   * This establishes a foreign key relationship to the `Category` table.
   */
  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
