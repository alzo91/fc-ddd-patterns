import { IncreasePriceProduct } from "./index";
import { Product } from "../../entities/product";

describe("Increase price of product unit test", () => {
  it("should increase the price of a product in 10%", () => {
    const product1 = new Product({
      name: "Product",
      price: 100,
    });
    const product2 = new Product({
      name: "Product",
      price: 200,
    });
    IncreasePriceProduct.increasePrice([product1, product2], 10);
    expect(product1.price).toBe(110);
    expect(product2.price).toBe(220);
  });

  it("should increase the price of a product in 100%", () => {
    const product1 = new Product({
      name: "Product",
      price: 100,
    });
    const product2 = new Product({
      name: "Product",
      price: 200,
    });
    IncreasePriceProduct.increasePrice([product1, product2], 100);
    expect(product1.price).toBe(200);
    expect(product2.price).toBe(400);
  });
});
