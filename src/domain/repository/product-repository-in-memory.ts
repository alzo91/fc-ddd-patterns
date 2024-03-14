import { Product } from "../entities/product";
import { ProductRepositoryInterface } from "./product-repository-interface";

export class ProductRepositoryInMemory implements ProductRepositoryInterface {
  private repository: Product[] = [];
  async create(data: Product): Promise<void> {
    this.repository.push(data);
  }
  async update(data: Product): Promise<void> {
    const products = this.repository.filter(
      (product) => product.id !== data.id
    );
    products.push(data);
  }
  async find(id: string): Promise<Product | undefined> {
    return this.repository.find((product) => product.id === id);
  }
  async findAll(): Promise<Product[]> {
    return this.repository;
  }
}
