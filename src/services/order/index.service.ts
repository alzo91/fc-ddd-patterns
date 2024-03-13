import { Order } from "../../entities/order";

export class OrderService {
  static total(orders: Order[]): number {
    return orders.reduce((acc, next) => acc + next.total(), 0);
  }
}
