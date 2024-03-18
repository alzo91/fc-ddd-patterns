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

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product({ name: "Mouse Gamer", price: 59.9 });

    await productRepository.create(product);

    const product_model = await ProductModel.findOne({
      where: { id: product.id },
    });

    expect(product_model?.toJSON()).toStrictEqual({
      id: product.id,
      name: product.name,
      price: product.price,
    });

    product.changeName("Product 002");
    product.changePrice(200);

    await productRepository.update(product);

    const updated_product = await ProductModel.findOne({
      where: { id: product.id },
    });

    expect(updated_product?.toJSON()).toStrictEqual({
      id: product.id,
      name: "Product 002",
      price: 200,
    });
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const id = "0001-0001-001";
    const product = new Product({ id, name: "Mouse Gamer", price: 59.9 });

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id } });

    const found_product = await productRepository.find(id);

    expect(productModel?.toJSON()).toStrictEqual({
      id: found_product?.id,
      name: found_product?.name,
      price: found_product?.price,
    });
  });

  it("should find all products", async () => {
    const productRepository = new ProductRepository();
    const id_001 = "0001-0001-001";
    const product1 = new Product({
      id: id_001,
      name: "Mouse Gamer",
      price: 59.9,
    });
    await productRepository.create(product1);
    const id_002 = "0002-0002-002";
    const product2 = new Product({
      id: id_002,
      name: "Keyboard Gamer",
      price: 159.9,
    });
    await productRepository.create(product2);

    const foundProducts = await productRepository.findAll();
    const products = [product1, product2];

    expect(products).toEqual(foundProducts);
  });
});
