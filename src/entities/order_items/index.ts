import { randomUUID } from "crypto";

type OrderItemProps = {
  id?: string;
  name: string;
  price: number;
  quantity: number;
  productId: string;
};

export class OrderItem {
  private _id: string;
  private _name: string;
  private _price: number;
  private _quantity: number;
  private _productId: string;

  constructor(props: OrderItemProps) {
    this._id = props.id ?? randomUUID();
    this._name = props.name;
    this._price = props.price;
    this._quantity = props.quantity;
    this._productId = props.productId;
  }

  total(): number {
    return this._price * this._quantity ?? 0;
  }

  toJSON() {
    return {
      id: this._id,
      name: this._name,
      price: this._price,
      quantity: this._quantity,
      total: this.total(),
    };
  }
}
