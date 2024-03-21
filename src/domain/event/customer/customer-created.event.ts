import { EventInterface } from "../@shared/event.interface";

type CreatedEventProps = {
  dateTimeOcurred: Date;
  customer: {
    id: string;
    name: string;
    active: boolean;
  };
};

export class CustomerCreatedEvent implements EventInterface {
  dateTimeOcurred: Date;
  eventData: any;

  constructor(props: CreatedEventProps) {
    this.dateTimeOcurred = props.dateTimeOcurred;
    this.eventData = props.customer;
  }
}
