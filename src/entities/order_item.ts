import { randomUUID } from "crypto";

type OrderItemProps = {
  id?: string;
  name: string;
  price: number;
  quantity: number;
};

export class OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;

  constructor(props: OrderItemProps) {
    this.id = props.id ?? randomUUID();
    this.name = props.name;
    this.price = props.price;
    this.quantity = props.quantity;
  }

  total(): number {
    return this.price * this.quantity ?? 0;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      quantity: this.quantity,
      total: this.total(),
    };
  }
}
