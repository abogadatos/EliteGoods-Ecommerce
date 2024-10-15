import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/database/entities/product.entity';
import { Category } from 'src/database/entities/category.entity';
import { CategoriesService } from '../categories/categories.service';
import { CategoriesCustomRepository } from '../categories/categories.respository';
import { ProductsCustomRepository } from './products.repository';
import { UsersService } from '../users/users.service';
import { usersCustomRepo } from '../users/users.repository';
import { User } from 'src/database/entities/user.entity';
// import { ProductsRepository } from './products.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Product, User])],
  controllers: [ProductsController],
  providers: [
    CategoriesCustomRepository,
    CategoriesService,
    usersCustomRepo,
    UsersService,
    ProductsCustomRepository,
    ProductsService,
  ],
})
export class ProductsModule {}
