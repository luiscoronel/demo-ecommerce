import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MoreThan, Repository } from 'typeorm';
import { Product } from './entities/products.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../categories/entities/category.entity';
import * as data from '../utils/data.json';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async getProducts(page: number, limit: number): Promise<Product[]> {
    let products = await this.productsRepository.find({
      where: {
        stock: MoreThan(0),
      },
      relations: {
        categories: true,
      },
    });
    if (products.length <= 0) {
      throw new BadRequestException('Products not found...');
    }
    const start = (page - 1) * limit;
    const end = page * limit;
    return products.slice(start, end);
  }

  async addProducts() {
    const categories = await this.categoriesRepository.find();
    if (categories.length <= 0)
      throw new BadRequestException('Categories not found...');

    data?.map(async (element) => {
      const category = categories.find(
        (category) => category.name === element.category,
      );

      const product = new Product();
      product.name = element.name;
      product.description = element.description;
      product.price = element.price;
      product.stock = element.stock;
      product.categories = category;

      await this.productsRepository
        .createQueryBuilder()
        .insert()
        .into(Product)
        .values(product)
        .orUpdate(['description', 'price', 'stock', 'imgUrl'], ['name'])
        .execute();
    });

    return 'Productos agregados';
  }

  async updateProduct(id: string, product: Partial<Product>) {
    const productUpdate = await this.productsRepository.findOne({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException('Product not found...');
    }
    Object.assign(product, productUpdate);
    await this.productsRepository.save(product);
    return product;
  }
}
