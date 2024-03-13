import { Address } from "../../entities/address";
import { Customer } from "../../entities/customer";
import { Order } from "../../entities/order";
import { OrderItem } from "../../entities/order_items";
import { OrderService } from "./index.service";

describe("Order Service Unit Test", () => {
  let item_1: OrderItem = {} as OrderItem;
  let item_2: OrderItem = {} as OrderItem;
  let items: OrderItem[] = [];
  beforeAll(() => {
    item_1 = new OrderItem({
      name: "Product 001",
      price: 10,
      productId: "product_0001",
      quantity: 10,
    });
    item_2 = new OrderItem({
      name: "Product 002",
      price: 20,
      productId: "product_0002",
      quantity: 10,
    });
    items = [item_1, item_2];
  });

  it("should be able to calculate the total between the orders", () => {
    const customer = new Customer({ name: "Customer 001" });

    const order = new Order({ customerId: customer.id, items: [item_1] });
    const order2 = new Order({ customerId: customer.id, items: [item_2] });
    const order3 = new Order({
      customerId: customer.id,
      items: [item_1, item_2],
    });
    const orders = [order, order2, order3];
    const amount = orders.reduce((acc, item) => acc + item.total(), 0);

    const total = OrderService.total(orders);
    expect(total).toBe(amount);
  });

  it("should be able to add customer rewards when order has been created", () => {
    const address = new Address({
      city: "San Francisco",
      state: "CA",
      neighborhood: "San",
      street: "San Francisco",
      zip_code: "12345",
    });
    const customer = new Customer({ name: "RewardsCustomer", address });
    customer.activate();

    const order = OrderService.placeOrder(customer, items);

    expect(order.total()).toBe(300);
    expect(customer.rewards_points).toBe(150);
  });
});
