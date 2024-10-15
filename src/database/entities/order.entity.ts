import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { OrderDetail } from './orderDetail.entity';

/**
 * Represents a purchase order within the e-commerce platform.
 * Orders are linked to a user and contain details about the purchased products.
 */
@Entity({
  name: 'orders',
})
export class Order {
  /**
   * Unique identifier for each order.
   *
   * @remarks
   * Automatically generated as a UUID string by the database.
   *
   * @example "76fcded5-9ec5-4b75-b2a4-d2e8fbc3d55a"
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Timestamp indicating when the order was created.
   *
   * @remarks
   * Defaults to the current timestamp when a new order is created, reflecting the order date.
   *
   * @example "2024-10-13T16:20:50.000Z"
   */
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  date: Date;

  /**
   * Details of the order, including items purchased, quantities, and prices.
   *
   * @remarks
   * Establishes a one-to-one relationship with the OrderDetail entity.
   * Each order has a unique set of details, stored in the OrderDetail entity.
   *
   * @example
   * {
   *   id: "3fbb3e5b-2a4e-4898-9b6d-b8e8d12e4a56",
   *   items: [{ productId: "prod123", quantity: 2, price: 59.99 }],
   *   total: 119.98
   * }
   */
  @OneToOne(() => OrderDetail, (orderDetails) => orderDetails.orders)
  @JoinColumn({ name: 'orderDetail_ID' })
  orderDetails: OrderDetail;

  /**
   * User associated with the order, representing the customer who placed the order.
   *
   * @remarks
   * Establishes a many-to-one relationship with the User entity.
   * Each order is linked to a single user, but a user can have multiple orders.
   *
   * @example
   * {
   *   id: "user456",
   *   name: "Jane Doe",
   *   email: "jane.doe@example.com"
   * }
   */
  @ManyToOne(() => User, (user) => user.orders)
  user: User;
}
