type IAddress = {
  zip_code: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
};

export class Address {
  private _zip_code: string;
  private _street: string;
  private _neighborhood: string;
  private _city: string;
  private _state: string;

  constructor(props: IAddress) {
    this._zip_code = props.zip_code;
    this._state = props.state;
    this._city = props.city;
    this._neighborhood = props.neighborhood;
    this._street = props.street;
    this.validate();
  }

  validate() {
    if (this._state.length === 0 || this._state.length > 2) {
      throw new Error(`State is required and it should be 2 chars`);
    }

    if (this._street.length === 0) {
      throw new Error("Street is required");
    }
  }

  get zip_code() {
    return this._zip_code;
  }

  get street() {
    return this._street;
  }

  get neighborhood() {
    return this._neighborhood;
  }
  get city() {
    return this._city;
  }

  get state() {
    return this._state;
  }
}
