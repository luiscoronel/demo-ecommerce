import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from '../guards/auth.guard';
import { CreateProductDto } from './dto/products.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../users/roles.enum';
import { Response } from 'express';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
  ) {}

  @Get()
  @HttpCode(200)
  @ApiQuery({ name: 'page', required: false})
  @ApiQuery({ name: 'limit', required: false})
  getProducts(@Query('page') page: string, @Query('limit') limit: string) {
    return this.productsService.getProduct(Number(page), Number(limit));
  }

  @Get('seeder')
  @HttpCode(201)
  addProduct() {
    return this.productsService.addProducts();
  }

  @Put(':id')
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  updateProduct(@Param('id', ParseUUIDPipe) id: string,
  @Body() product: CreateProductDto,
  @Res() res: Response,  
  ) 
  {
    const updateProductId = this.productsService.updateProduct(id, product);
    res.status(HttpStatus.OK).json({ id: updateProductId})
  }

}
