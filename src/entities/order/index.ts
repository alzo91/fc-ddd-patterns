import { randomUUID } from "crypto";
import { OrderItem } from "../order_items";

type OrderItemProps = {
  id?: string;
  customerId: string;
  items: OrderItem[];
};

export class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[];

  constructor(props: OrderItemProps) {
    this._id = props.id ?? randomUUID();
    this._customerId = props.customerId;
    this._items = props.items;
    this.validate();
  }

  validate(): void {
    if (!this._id) throw new Error("Order requires an ID");
    if (!this._customerId) throw new Error("Order requires an customerId");
    if (this._items.length < 1)
      throw new Error("Order requires at least one item");
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