import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from 'src/database/entities/orderDetail.entity';
import { Order } from 'src/database/entities/order.entity';
import { User } from 'src/database/entities/user.entity';
import { Product } from 'src/database/entities/product.entity';
import { ordersCustomRepository } from './orders.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    TypeOrmModule.forFeature([OrderDetail]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Product]),
  ],
  providers: [OrdersService, ordersCustomRepository],
  controllers: [OrdersController],
})
export class OrdersModule {}
