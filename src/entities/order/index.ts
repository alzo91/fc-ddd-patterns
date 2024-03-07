import { randomUUID } from "crypto";
import { OrderItem } from "../order_items";

type OrderItemProps = {
  id?: string;
  customerId: string;
  items: OrderItem[];
};

export class Order {
  _id: string;
  _customerId: string;
  _items: OrderItem[];

  constructor(props: OrderItemProps) {
    this._id = props.id ?? randomUUID();
    this._customerId = props.customerId;
    this._items = props.items;
  }

  total(): number {
    return this._items.reduce((acc, next) => acc + next.total(), 0);
  }
  toJSON() {
    return {
      id: this._id,
      customerId: this._customerId,
      items: this._items.map((item) => item.toJSON()),
      amount: this.total(),
    };
  }
}
