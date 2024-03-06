import { Address } from "./address";

export class Customer {
  _id: string;
  _name: string;
  _address?: Address;
  _active: boolean = false;

  constructor(id: string, name: string, address?: Address) {
    this._id = id;
    this._name = name;
    this._address = address;
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

  updateAddress(address: Address) {
    this._address = address;
  }
}
