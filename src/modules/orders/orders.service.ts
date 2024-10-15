import { ordersCustomRepository } from './orders.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/database/entities/order.entity';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/createOrder.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private ordersCustomRepository: ordersCustomRepository,
  ) {}

  async addOrder(orderData: CreateOrderDto) {
    return await this.ordersCustomRepository.addOrder(orderData);
  }

  async getOrder(orderID: string) {
    const order = await this.ordersRepository.findOne({
      where: { id: orderID },
      relations: { orderDetails: { products: true } },
    });

    if (!order)
      throw new NotFoundException('order not found or does not exist');
    return order;
  }

  async getAllOrders() {
    return await this.ordersCustomRepository.getallOrders();
  }
}
