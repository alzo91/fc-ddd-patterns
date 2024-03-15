import { Product } from "../../../domain/entities/product";
import { ProductRepositoryInterface } from "../../../domain/repository/product-repository-interface";

export class ProductRepositoryInMemory implements ProductRepositoryInterface {
  private repository: Product[] = [];
  async create(entity: Product): Promise<void> {
    this.repository.push(entity);
  }
  async update(entity: Product): Promise<void> {
    const products = this.repository.filter(
      (product) => product.id !== entity.id
    );
    products.push(entity);
  }
  async find(id: string): Promise<Product | null> {
    return this.repository.find((product) => product.id === id) ?? null;
  }
  async findAll(): Promise<Product[]> {
    return this.repository;
  }
}
