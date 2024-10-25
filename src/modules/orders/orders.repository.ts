import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/database/entities/order.entity';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { Product } from './../../database/entities/product.entity';
import { CreateOrderDto } from './dto/createOrder.dto';
import { OrderDetail } from 'src/database/entities/orderDetail.entity';

@Injectable()
export class ordersCustomRepository {
  private prices: number[] = [];
  private totalPrice: number;
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(OrderDetail)
    private readonly ordersDetails: Repository<OrderDetail>,
  ) {}

  async getOrder(id: string) {
    const user = await this.usersRepository.find({
      where: { id },
      relations: ['orderDetails', 'orderDetails.products'],
    });

    if (!user) {
      return `Order not found`;
    }
  }

  async getallOrders() {
    const orders: Order[] | undefined = await this.ordersRepository.find();
    if (orders.length === 0)
      throw new NotFoundException('order list is still empty');

    return orders;
  }

  async addOrder(orderData: CreateOrderDto) {
    this.prices = [];
    this.totalPrice = 0;

    const user = await this.usersRepository.findOne({
      where: { id: orderData.userID },
      relations: { orders: true },
    });

    if (!user) {
      throw new NotFoundException("User not found or doesn't exist");
    }

    const order = new Order();
    order.date = new Date();
    order.user = user;

    const products: Product[] = [];

    for (const productObj of orderData.productsID) {
      const product = await this.productsRepository.findOne({
        where: { id: productObj.id },
      });
      console.log(productObj);
      console.log(product);

      if (!product) {
        throw new NotFoundException(
          `Product with ID ${productObj.id} not found`,
        );
      }

      if (product.stock < productObj.quantity) {
        throw new BadRequestException(
          `Insufficient stock for product ID ${productObj.id}. Available: ${product.stock}, Requested: ${productObj.quantity}`,
        );
      }

      product.stock -= productObj.quantity;
      await this.productsRepository.save(product);

      this.sumAllPrices(product, productObj.quantity);
      products.push(product);
    }

    try {
      const newOrder = await this.ordersRepository.save(order);

      const orderDetails = new OrderDetail();
      orderDetails.orders = newOrder;
      orderDetails.price = this.totalPrice;
      orderDetails.products = products;

      const newDetail = await this.ordersDetails.save(orderDetails);

      order.orderDetails = newDetail;
      await this.ordersRepository.save(order);

      user.orders.push(order);
      await this.usersRepository.save(user);

      const result = await this.ordersRepository.findOne({
        where: { id: order.id },
        relations: ['orderDetails'],
      });

      return { order: result };
    } catch (error) {
      console.error('Error adding order:', error.message);
      throw new BadRequestException('Please check the product IDs');
    }
  }

  private purchaseDateTime(): string {
    const date = new Date();
    const currentDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    const hours = `${date.getHours()}:${date.getMinutes()}`;

    return `${currentDate} ${hours}hs`;
  }

  private sumAllPrices(product: Product, quantity: number): void {
    const totalProductPrice = product.price * quantity;
    this.totalPrice += Math.round(totalProductPrice * 100) / 100; // rounding to 2 decimal places
  }

  private async stockController(product: Product) {
    if (!product) return;
    const stock = product.stock;
    if (stock === 0) {
      throw new BadRequestException(
        `Product with ID ${product.id} is out of stock`,
      );
    } else {
      product.stock = stock - 1;
      await this.productsRepository.save(product);
    }
  }
}
