import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { IProduct } from 'src/@types/products';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }
  // Implement your controller methods here

  @Get()
  findAll(): string {
    return this.productsService.getAllProducts();
  }
  @Post()
  create(): string {
    return this.productsService.createProduct();
  }
  @Get(':id')
  findOne(@Param('id') id: string): string {
    return this.productsService.getProductById(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateData: Partial<IProduct >): any {
    return this.productsService.updateProduct(id, updateData);
  }
}
