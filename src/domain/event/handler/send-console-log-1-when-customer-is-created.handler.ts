import { EventHandlerInterface } from "../@shared/event-handler.interface";
import { CustomerCreatedEvent } from "../customer/customer-created.event";

export class SendConsoleLog1WhenCustomerIsCreated
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  async handle(event: CustomerCreatedEvent): Promise<void> {
    const formattedDate = Intl.DateTimeFormat("pt", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(event.dateTimeOcurred);
    console.log("Esse é o primeiro console.log do evento: CustomerCreated");
    console.log(
      `Customer created at ${formattedDate}`,
      JSON.stringify(event.eventData)
    );
  }
}
