import { Product } from "../../../domain/entities/product";
import { ProductRepositoryInterface } from "../../../domain/repository/product-repository-interface";
import ProductModel from "../../db/sequelize/model/product-model";

export class ProductRepository implements ProductRepositoryInterface {
  async create(entity: Product): Promise<void> {
    await ProductModel.create(entity.toJSON());
  }
  async update(entity: Product): Promise<void> {
    await ProductModel.update(entity.toJSON(), {
      where: { id: entity.id },
    });
  }
  async find(id: string): Promise<Product | null> {
    const found_product = await ProductModel.findOne({ where: { id } });
    if (!found_product) return null;
    return new Product({
      id: found_product.id,
      name: found_product.name,
      price: found_product.price,
    });
  }
  async findAll(): Promise<Product[]> {
    const products = await ProductModel.findAll();
    return products.map(
      (product) =>
        new Product({
          id: product.id,
          name: product.name,
          price: product.price,
        })
    );
  }
}
