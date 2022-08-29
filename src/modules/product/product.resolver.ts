import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateProductInput,
  FilterProduct,
  UpdateProductInput,
} from './dto/product.input';
import { Product, ProductResult } from './entities/product.entity';
import { ProductService } from './product.service';

@Resolver()
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => ProductResult)
  async getAllProduct(
    @Args('page', { nullable: true, type: () => Int }) page: number = 0,
    @Args('size', { nullable: true, type: () => Int }) size: number = 50,
    @Args('filter', { nullable: true }) filter: FilterProduct,
  ): Promise<ProductResult> {
    return this.productService.getAll(page, size, filter);
  }

  @Query(() => Product)
  async getProductById(@Args('id') id: string): Promise<Product> {
    return this.productService.getById(id);
  }

  @Mutation(() => Product)
  async createProduct(
    @Args('input') input: CreateProductInput,
  ): Promise<Product> {
    return this.productService.create(input);
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('id') id: string,
    @Args('input') input: UpdateProductInput,
  ): Promise<Product> {
    return this.productService.update(id, input);
  }

  @Mutation(() => Boolean)
  async deleteProduct(@Args('id') id: string): Promise<boolean> {
    return this.productService.delete(id);
  }
}
