import { Injectable } from '@nestjs/common';
import { IProduct } from 'src/@types/products';

@Injectable()
export class ProductsService {
  getAllProducts(): string {
    return 'This action returns all products';
  }
  createProduct(): string {
    return 'This action creates a new product';
  }
  getProductById(id: string): string {
    return `This action returns a #${id} product`;
  }
  updateProduct(id: string, updateData: Partial<IProduct>): any {
    const product = this.getProductById(id);

    if (product) {
      return {
        ...updateData,
        updatedAt: new Date(),
      };
    }
    return undefined;

  }
}
