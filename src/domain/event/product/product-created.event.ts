import { Product } from "../../entities/product";
import { EventInterface } from "../@shared/event.interface";

type ProductCreatedProps = {
  dateTimeOcurred: Date;
  payload: Product;
};

export class ProductCreatedEvent implements EventInterface {
  dateTimeOcurred: Date;
  eventData: any;

  constructor(props: ProductCreatedProps) {
    this.dateTimeOcurred = props.dateTimeOcurred;
    this.eventData = props.payload;
  }
}
