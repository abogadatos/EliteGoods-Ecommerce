import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { Order } from './order.entity';
import { Product } from './product.entity';

@Entity({
  name: 'order_details',
})
export class OrderDetail {
  /**
   * Unique identifier for the order detail, generated as a UUID.
   *
   * @example "6e60d44f-90b6-4b9d-925c-f8be42b6e983"
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Total price for the products within this order detail.
   *
   * - Cannot be null.
   * - Precision of 10 digits with 2 decimal places.
   *
   * @remarks
   * This is stored as `decimal` to accurately reflect currency values.
   *
   * @example 199.99
   */
  @Column({
    type: 'decimal',
    nullable: false,
    precision: 10,
    scale: 2,
  })
  price: number;

  /**
   * One-to-one relationship with an Order entity.
   *
   * - Links this order detail to a specific order.
   *
   * @remarks
   * The `JoinColumn` decorator specifies `order_id` as the foreign key column.
   */
  @OneToOne(() => Order, (order) => order.orderDetails)
  @JoinColumn({ name: 'order_id' })
  orders: Order;

  /**
   * Many-to-many relationship with Product entities.
   *
   * - Establishes a join table named `orderDetails_Product` to manage the relationship.
   *
   * @remarks
   * The `joinColumn` references `product_id` while `inverseJoinColumn` refers to `orderDetail_id`, mapping products to their order details.
   */
  @ManyToMany(() => Product)
  @JoinTable({
    name: 'orderDetails_Product',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'orderDetail_id',
      referencedColumnName: 'id',
    },
  })
  products: Product[];
}
