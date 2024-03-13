import { Product } from "../../entities/product";
export class IncreasePriceProduct {
  static increasePrice(products: Product[], percentage: number) {
    products.forEach((product) => {
      product.changePrice(product.price + (product.price * percentage) / 100);
    });
  }
}
