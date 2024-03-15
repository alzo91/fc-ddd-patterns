import { Sequelize } from "sequelize-typescript";
import { db_sequelize_options_for_test } from "../../db/sequelize/db-sequelize-options-for-test";
import ProductModel from "../../db/sequelize/model/product-model";
import { Product } from "../../../domain/entities/product";
import { ProductRepository } from "./product-repository";

describe("[INFRA] - Product Repository", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({ ...db_sequelize_options_for_test });
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product({ name: "Mouse Gamer", price: 59.9 });
    await productRepository.create(product);
    const found_product = await ProductModel.findOne({
      where: { id: product.id },
    });
    expect(found_product?.toJSON()).toStrictEqual({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  });
});
