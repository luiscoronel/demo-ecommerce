import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/entities/products.entity';
import { Category } from '../categories/entities/category.entity';
import { CloudinaryConfig } from '../config/cloudinary';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category])],
  providers: [ ProductsService,ProductsRepository, CloudinaryConfig],
  controllers: [ProductsController],
})
export class ProductsModule {}
