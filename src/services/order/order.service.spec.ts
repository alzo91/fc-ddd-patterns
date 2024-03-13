import { Customer } from "../../entities/customer";
import { Order } from "../../entities/order";
import { OrderItem } from "../../entities/order_items";
import { OrderService } from "./index.service";

describe("Order Service Unit Test", () => {
  it("should be able to calculate the total between the orders", () => {
    const customer = new Customer({ name: "Customer 001" });
    const item1 = new OrderItem({
      name: "Product 001",
      price: 10,
      productId: "product_0001",
      quantity: 10,
    });
    const item2 = new OrderItem({
      name: "Product 002",
      price: 20,
      productId: "product_0002",
      quantity: 10,
    });

    const order = new Order({ customerId: customer.id, items: [item1] });
    const order2 = new Order({ customerId: customer.id, items: [item2] });
    const order3 = new Order({
      customerId: customer.id,
      items: [item1, item2],
    });
    const orders = [order, order2, order3];
    const amount = orders.reduce((acc, item) => acc + item.total(), 0);

    const total = OrderService.total(orders);
    expect(total).toBe(amount);
  });
});
