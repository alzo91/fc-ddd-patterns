import { Address } from "../../entities/address";
import { EventInterface } from "../@shared/event.interface";

type CreatedEventProps = {
  customer: {
    id: string;
    name: string;
  };
  old_address: Address;
  new_address: Address;
};

export class CustomerAddressChangedEvent implements EventInterface {
  dateTimeOcurred: Date;
  eventData: any;

  constructor(props: CreatedEventProps) {
    this.dateTimeOcurred = new Date();
    this.eventData = props;
  }
}
