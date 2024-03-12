import { OrderItem } from "../order_items";
import { Order } from "./index";

describe("", () => {
  //
  it("should throw error when ID is empty", () => {
    expect(
      () =>
        new Order({
          id: "",
          customerId: "",
          items: [],
        })
    ).toThrow(new Error("Order requires an ID"));
  });

  it("should throw error when customerID is empty", () => {
    expect(
      () =>
        new Order({
          customerId: "",
          items: [],
        })
    ).toThrow(new Error("Order requires an customerId"));
  });

  it("should throw error if an order doesn't have any item", () => {
    expect(
      () =>
        new Order({
          customerId: "customer_id",
          items: [],
        })
    ).toThrow(new Error("Order requires at least one item"));
  });

  it("should be able to calculate total", () => {
    const item1 = new OrderItem({ name: "pencil", quantity: 10, price: 2 });
    const item2 = new OrderItem({ name: "pen", quantity: 10, price: 4 });
    const order = new Order({
      customerId: "customer-id",
      items: [item1, item2],
    });

    expect(order.total()).toBe(60);
  });
});
