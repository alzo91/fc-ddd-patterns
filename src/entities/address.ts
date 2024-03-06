type IAddress = {
  zip_code: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
};

export class Address {
  private zip_code: string;
  private street: string;
  private neighborhood: string;
  private city: string;
  private state: string;

  constructor(props: IAddress) {
    this.zip_code = props.zip_code;
    this.state = props.state;
    this.city = props.city;
    this.neighborhood = props.neighborhood;
    this.street = props.street;
    this.validate();
  }

  validate() {
    if (this.state.length === 0 || this.state.length > 2) {
      throw new Error(`State is required and it should be 2 chars`);
    }

    if (this.street.length === 0) {
      throw new Error("Street is required");
    }
  }
}
