import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryConfig } from 'src/database/config/cloudinary.config';
import { CategoriesService } from '../categories/categories.service';
import { ProductsService } from '../products/products.service';
import { CloudinaryService } from '../users/cloudinary.service';
import { Category } from './../../database/entities/category.entity';
import { Product } from './../../database/entities/product.entity';
import { FileUploadController } from './file_upload.controller';
import { FileUploadService } from './file_upload.service';
import { UsersService } from '../users/users.service';
import { ProductsCustomRepository } from '../products/products.repository';
import { CategoriesCustomRepository } from '../categories/categories.respository';
import { usersCustomRepo } from '../users/users.repository';
import { User } from 'src/database/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, File, Category, User])],
  controllers: [FileUploadController],
  providers: [
    FileUploadService,
    CloudinaryConfig,
    ProductsService,
    CloudinaryService,
    CategoriesService,
    UsersService,
    ProductsCustomRepository,
    CategoriesCustomRepository,
    usersCustomRepo,
  ],
})
export class FileUploadModule {}
