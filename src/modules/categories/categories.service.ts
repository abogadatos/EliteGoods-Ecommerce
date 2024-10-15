import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/database/entities/category.entity';
import { Repository } from 'typeorm';
import { CategoriesCustomRepository } from './categories.respository';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    private customCategoriesRepo: CategoriesCustomRepository,
  ) {}

  async getCategories() {
    return await this.categoriesRepository.find();
  }

  async addCategories() {
    return await this.customCategoriesRepo.addCategories();
  }

  async addCategory(name: string) {
    const newCategory = this.categoriesRepository.create({ name });
    return await this.categoriesRepository.save(newCategory);
  }
}
