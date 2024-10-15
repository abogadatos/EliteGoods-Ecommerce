import { Roles } from 'src/decorators/roles.decorator';
import { CategoriesService } from './categories.service';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Role } from 'src/enum/role.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('CATEGORIES')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('getter')
  @ApiBearerAuth()
  @Roles(Role.SuperAdmin, Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getCategories() {
    return this.categoriesService.getCategories();
  }

  @Get('seeder')
  @ApiBearerAuth()
  @Roles(Role.SuperAdmin, Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  seedLoader() {
    return this.categoriesService.addCategories();
  }

  @Post('addCategory')
  @ApiBearerAuth()
  @Roles(Role.SuperAdmin, Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  addCategory(@Body('name') name) {
    return this.categoriesService.addCategory(name);
  }
}
