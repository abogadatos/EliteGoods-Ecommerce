import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/database/entities/product.entity';
import { Repository } from 'typeorm';
import { CategoriesService } from './../categories/categories.service';
import { ProductsCustomRepository } from './products.repository';
import { UsersService } from '../users/users.service';
// import * as data from '../../utils/mock-data.json';

@Injectable()
export class ProductsService implements OnModuleInit {
  constructor(
    private readonly categoriesService: CategoriesService,
    private usersService: UsersService,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    private productsCustomRepo: ProductsCustomRepository,
  ) {}

  async onModuleInit() {
    await this.categoriesService.addCategories();
    setTimeout(() => {
      this.productSeeder();
    }, 1000);
    setTimeout(() => {
      this.usersService.addUsers();
    }, 1500);
  }

  async productSeeder() {
    return await this.productsCustomRepo.seedProducts();
  }

  async getProducts(page: number, limit: number) {
    let products = await this.productsRepository.find({
      relations: {
        category: true,
      },
    });

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + +limit;

    products = products.slice(startIndex, endIndex);

    return products;
  }

  async getProductById(id: string): Promise<string | Partial<Product>> {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: {
        category: true,
      },
    });
    if (!product) {
      return `Product not found`;
    }
    return product;
  }

  async getProductByName(name: string) {
    const product = this.productsRepository.findOne({
      where: { name },
      relations: {
        category: true,
      },
    });
    if (!product) {
      return `Product not found`;
    }
    return product;
  }

  async addProduct(product: Product): Promise<Product> {
    const checkProduct = await this.productsRepository.find({
      where: { name: product.name },
    });

    if (!checkProduct) {
      return await this.productsRepository.save(product);
    } else throw new BadRequestException(`Product already exists`);
  }

  async update(id: string, product: Partial<Product>) {
    await this.productsRepository.update(id, product);
    const updatedProduct = await this.productsRepository.findOneBy({ id });
    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<string> {
    const product = await this.productsRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    await this.productsRepository.remove(product);
    // console.log(`LOG: Product '${product.name}' was deleted successfully`);
    return `LOG: Product '${product.name}' was deleted successfully`;
  }
}
