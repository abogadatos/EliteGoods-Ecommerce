import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/database/entities/category.entity';
import { Product } from 'src/database/entities/product.entity';
import { Repository } from 'typeorm';
import * as data from '../../utils/mock-data.json';

@Injectable()
export class ProductsCustomRepository {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async seedProducts() {
    const categories = await this.categoriesRepository.find();
    // console.log(categories);

    for (const element of data) {
      const category = categories.find(
        (category) => category.name === element.category,
      );
      //   console.log(category);

      if (category) {
        console.log(
          `INSERTING: Product '${element.name}' under category: -> '${category.name}'`,
        );

        this.productsRepository
          .createQueryBuilder()
          .insert()
          .into(Product)
          .values({
            name: element.name,
            description: element.description,
            price: element.price,
            imgUrl: element.imgUrl,
            stock: element.stock,
            category: {
              id: category.id,
            },
          })
          .orIgnore()
          .execute();

        console.log(`LOG: Product '${element.name}' added successfully`);
      } else {
        console.log(
          `LOG: Category ${element.category} not found for product ${element.name}`,
        );
      }
    }
    return {
      message: `Products already exist`,
    };
  }
}
