import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor( private ordersRepository: OrdersRepository){}

   addOrder(userId: string, products: string[]) {
      const order = this.ordersRepository.addOrder(userId, products);
      return order;
  }

  getOrder(id: string) {
    return this.ordersRepository.getOrder(id);
  }
}
