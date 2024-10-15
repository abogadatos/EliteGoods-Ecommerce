import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Product } from 'src/database/entities/product.entity';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/role.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('PRODUCTS')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsRepositoryService: ProductsService) {}

  @Get()
  getProducts(@Query('page') page: string, @Query('limit') limit: string) {
    const pageQuery = Number(page);
    const limitQuery = Number(limit);
    if (pageQuery && limitQuery) {
      return this.productsRepositoryService.getProducts(pageQuery, limitQuery);
    }
    return this.productsRepositoryService.getProducts(1, 5);
  }

  @Get('seeder')
  @ApiBearerAuth()
  @Roles(Role.SuperAdmin, Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  addProducts() {
    return this.productsRepositoryService.productSeeder();
  }

  @Get('info/:id')
  @ApiBearerAuth()
  @Roles(Role.SuperAdmin, Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getProductById(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsRepositoryService.getProductById(id);
  }

  @Post()
  @ApiBearerAuth()
  @Roles(Role.SuperAdmin, Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  addProduct(@Body() product: Product) {
    return this.productsRepositoryService.addProduct(product);
  }

  @Delete('delete/:id')
  @ApiBearerAuth()
  @Roles(Role.SuperAdmin, Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  deleteProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsRepositoryService.deleteProduct(id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @Roles(Role.SuperAdmin, Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() product: Partial<Product>,
  ) {
    return this.productsRepositoryService.update(id, product);
  }
}
