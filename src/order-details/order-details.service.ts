import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetail } from './entities/order-detail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderDetailsService {
  constructor(@InjectRepository(OrderDetail) private orderDetailRepository: Repository<OrderDetail>){}

  async create(createOrderDetail: OrderDetail): Promise<OrderDetail> {
    return this.orderDetailRepository.save(createOrderDetail);
  }

  async findAll(): Promise<OrderDetail[]> {
    return this.orderDetailRepository.find();
  }

  async findOne(id: string): Promise<OrderDetail> {
    return this.orderDetailRepository.findOneBy({id});
  }

  async update(id: string): Promise<OrderDetail> {
    const getId = await this.findOne(id)
    return this.orderDetailRepository.save(getId);
  }

  async remove(id: string): Promise<void> {
    await this.orderDetailRepository.delete(id);
  }
}
