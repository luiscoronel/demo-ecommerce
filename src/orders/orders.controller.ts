import { Controller, Get, Post, Body, ParseUUIDPipe, Query, UseGuards, UseInterceptors, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/orders.dto';
import { AuthGuard } from '../guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../users/roles.enum';
import { DateAdderInterceptor } from '@app/interceptors/date-adder.interceptor';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  
  @Post()
  @ApiBearerAuth()
  @Roles(Role.Admin, Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(DateAdderInterceptor)
  addOrder(@Body() createOrder: CreateOrderDto) {
    const { user, products } = createOrder; 
    const id  = products.map(product => product.id)
    return this.ordersService.addOrder( user, id); 
  }

  @Get(':id')
  @ApiBearerAuth()
  @Roles(Role.Admin, Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  getOrderById(@Param('id', ParseUUIDPipe) id: string) {
    console.log("Este es el id de Order: ", id);
      
    return this.ordersService.getOrder(id);
  }

}
