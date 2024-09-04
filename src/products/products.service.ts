import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Product } from './entities/products.entity';

@Injectable()
export class ProductsService {
  constructor( private readonly productsRepository:ProductsRepository) {}
 
  async getProduct(page: number, limit: number): Promise<Product[]> {
    return await this.productsRepository.getProducts(page, limit);
  }

  addProducts() {
    return this.productsRepository.addProducts();
  }

  updateProduct(id: string, product: Partial<Product>){
    return this.productsRepository.updateProduct(id, product);
  }
}
