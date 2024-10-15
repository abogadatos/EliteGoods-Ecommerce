import { AuthGuard } from 'src/guards/auth.guard';
import { CreateOrderDto } from './dto/createOrder.dto';
import { OrdersService } from './orders.service';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/role.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('ORDERS')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiBearerAuth()
  @Roles(Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  async addOrder(@Body() orderData: CreateOrderDto) {
    return await this.ordersService.addOrder(orderData);
  }

  @Get()
  @ApiBearerAuth()
  @Roles(Role.SuperAdmin, Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async getallOrders() {
    return await this.ordersService.getAllOrders();
  }

  @Get(':id')
  @ApiBearerAuth()
  @Roles(Role.SuperAdmin, Role.Admin, Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  async getOrder(@Param('id', ParseUUIDPipe) userID: string) {
    const order = await this.ordersService.getOrder(userID);
    return order;
  }
}
