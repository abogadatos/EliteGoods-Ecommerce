import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { Role } from 'src/enum/role.enum';

/**
 * Represents a registered user within the platform.
 * Users have a unique identity and can place orders, and each user is assigned specific roles.
 */
@Entity({
  name: 'users',
})
export class User {
  /**
   * Unique identifier for each user, generated as a UUID.
   *
   * @example "c4d7a29b-32be-4d41-b0e1-9db8f6f4ec45"
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * User's full name.
   *
   * @remarks
   * Name must be unique and should not exceed 50 characters.
   *
   * @example "Carlos Gregorio Márquez"
   */
  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  /**
   * User's unique email address used for login and communication.
   *
   * @remarks
   * Must be a unique and non-empty string, up to 50 characters in length.
   *
   * @example "carlos.marquez@example.com"
   */
  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    nullable: false,
  })
  email: string;

  /**
   * Hashed password for user authentication.
   *
   * @remarks
   * Stored as a varchar to accommodate hashed strings up to 80 characters.
   */
  @Column({
    type: 'varchar',
    length: 80,
  })
  password: string;

  /**
   * Roles assigned to the user, which dictate their permissions within the platform.
   *
   * @remarks
   * Default role is 'User'. Possible roles are defined in the `Role` enum.
   *
   * @example ["Admin", "User"]
   */
  @Column({ type: 'enum', enum: Role, default: Role.User })
  roles: Role[];

  /**
   * User's phone number for contact purposes.
   *
   * @remarks
   * Stored as a varchar due to potential international formats and length requirements.
   *
   * @example "+1-202-555-0173"
   */
  @Column({
    type: 'varchar', // Formerly int, but changed to varchar due the 2.1 billion range integer type restriction in PostgreSQL
    length: 15,
  })
  phone: string;

  /**
   * Country of residence for the user.
   *
   * @remarks
   * Optional field, up to 50 characters in length.
   *
   * @example "Colombia"
   */
  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  country?: string;

  /**
   * Full address of the user.
   *
   * @remarks
   * Optional field, stored as text to accommodate various address formats.
   *
   * @example "P. Sherman 42 Wallaby Way, Sidney"
   */
  @Column({
    type: 'text',
    nullable: true,
  })
  address?: string;

  /**
   * City of residence for the user.
   *
   * @remarks
   * Optional field, up to 50 characters in length.
   *
   * @example "Bogotá"
   */
  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  city?: string;

  /**
   * Timestamp indicating when the user account was created.
   *
   * @remarks
   * Automatically generated when a new user record is created.
   *
   * @example "2024-10-13T14:20:30.000Z"
   */
  @CreateDateColumn()
  createdAt: Date;

  /**
   * Collection of orders placed by the user.
   *
   * @remarks
   * Establishes a one-to-many relationship with the Order entity. Each user can have multiple orders.
   *
   * @example
   * [
   *   { id: "order123", date: "2024-10-13T16:20:50.000Z" },
   *   { id: "order124", date: "2024-10-14T08:45:30.000Z" }
   * ]
   */
  @OneToMany(() => Order, (order) => order.user)
  @JoinColumn({ name: 'orders_ID' })
  orders: Order[];
}
