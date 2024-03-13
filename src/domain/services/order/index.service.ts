import { Customer } from "../../entities/customer";
import { Order } from "../../entities/order";
import { OrderItem } from "../../entities/order_items";
export class OrderService {
  static total(orders: Order[]): number {
    return orders.reduce((acc, next) => acc + next.total(), 0);
  }

  static placeOrder(customer: Customer, order_items: OrderItem[]) {
    if (order_items.length < 1) {
      throw new Error("Order requires at least one item");
    }
    const order = new Order({
      customerId: customer.id,
      items: order_items,
    });
    customer.addRewards(order.total() / 2);
    return order;
  }
}
