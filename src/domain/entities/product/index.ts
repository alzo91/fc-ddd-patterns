import { randomUUID } from "node:crypto";

interface ProductProps {
  id?: string;
  name: string;
  price: number;
}

export class Product {
  private _id: string;
  private _name: string;
  private _price: number;

  constructor(props: ProductProps) {
    this._id = props.id ?? randomUUID();
    this._name = props.name;
    this._price = props.price;
    this.validate();
  }

  validate() {
    if (!this._id) throw new Error("Product needs to be unique");
    if (!this._price) throw new Error("Product requires a price");
    if (this._name.length < 5)
      throw new Error("Product name must be at least 5 characters");
  }

  get id(): string {
    return this._id;
  }
  get price(): number {
    return this._price;
  }
  get name(): string {
    return this._name;
  }
  changeName(name: string): void {
    this._name = name;
    this.validate();
  }

  changePrice(price: number): void {
    this._price = price;
    this.validate();
  }
}
