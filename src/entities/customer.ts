import { randomUUID } from "crypto";
import { Address } from "./address";

type CustomerProps = {
  id?: string;
  name: string;
  address?: Address;
  active?: boolean;
};
export class Customer {
  private _id: string;
  private _name: string;
  private _address?: Address;
  private _active: boolean = false;

  constructor(props: CustomerProps) {
    this._id = props.id ?? randomUUID();
    this._name = props.name;
    this._address = props.address;
    this.validate();
  }

  /** auto-validation */
  validate() {
    if (this.name.length < 10) {
      throw new Error("Name should be greater than 10 chars");
    }

    if (this.id.length < 5) {
      throw new Error("Id should be greater than 5 chars");
    }
  }

  /** when we thinking about changeName
   * We are thinking about:
   *  business rule
   *  Our focus is business rule
   *
   */
  changeName(name: string) {
    this._name = name;
    this.validate(); /** after changing we are validating it */
  }

  activate() {
    if (this._address === undefined) {
      /** auto-validation */
      throw new Error("Address is mandatory to activate customer");
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  /** getters */
  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get address(): Address | undefined {
    return this._address;
  }

  get isActive(): boolean {
    return this._active;
  }
  /** setters */
  set Address(address: Address) {
    this._address = address;
  }

  toJSON() {
    return {
      id: this.id,
      name: this._name,
      address: this._address,
      active: this._active,
    };
  }
}
