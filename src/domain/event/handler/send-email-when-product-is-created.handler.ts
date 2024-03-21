import { EventHandlerInterface } from "../@shared/event-handler.interface";
import { ProductCreatedEvent } from "../product/product-created.event";

export class SendEmailWhenProductIsCreatedHandler
  implements EventHandlerInterface<ProductCreatedEvent>
{
  async handle(event: ProductCreatedEvent): Promise<void> {
    const formattedDate = Intl.DateTimeFormat("pt", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(event.dateTimeOcurred);

    console.log(
      `Product was created at ${formattedDate}`,
      JSON.stringify(event.eventData)
    );
  }
}
