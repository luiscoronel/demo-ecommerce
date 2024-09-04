import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './orders.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
