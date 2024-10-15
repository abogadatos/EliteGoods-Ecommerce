import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/database/entities/category.entity';
import { Repository } from 'typeorm';
import * as data from '../../utils/mock-data.json';

@Injectable()
export class CategoriesCustomRepository {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async getCategories() {
    return await this.categoriesRepository.find();
  }

  async addCategories() {
    const existingCategories = await this.categoriesRepository.count();
    if (existingCategories === 0) {
      data.map(async (product) => {
        await this.categoriesRepository
          .createQueryBuilder()
          .insert()
          .into(Category)
          .values({ name: product.category })
          .orIgnore()
          .execute();
      });
      console.log(`Categories were added from categories custom repo`);
      return {
        message: `The categories are unique and already exist in the categories table`,
      };
    } else {
      console.log(`Categories already seeded`);
      return {
        message: `Categories already exist`,
      };
    }
  }
}
