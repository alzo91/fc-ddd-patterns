import { EventHandlerInterface } from "../@shared/event-handler.interface";
import { CustomerAddressChangedEvent } from "../customer/customer-address-changed.event";

export class SendConsoleLog2WhenCustomerChangedAddress
  implements EventHandlerInterface<CustomerAddressChangedEvent>
{
  async handle(event: CustomerAddressChangedEvent): Promise<void> {
    const formattedDate = Intl.DateTimeFormat("pt", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(event.dateTimeOcurred);
    console.log("Esse é o segundo console.log do evento: CustomerCreated");
    console.log(
      `Customer changed at ${formattedDate}`,
      JSON.stringify(event.eventData)
    );
  }
}
