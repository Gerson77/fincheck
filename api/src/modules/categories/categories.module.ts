import { Module } from '@nestjs/common';
import { CategoriesService } from './services/categories.service';
import { CategoriesController } from './categories.controller';
import { ValidateCategoryOwnerShipService } from './services/validate-category-ownreship.service';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, ValidateCategoryOwnerShipService],
  exports: [ValidateCategoryOwnerShipService],
})
export class CategoriesModule {}
