import { EventDispatcher } from "../@shared/event-dispatcher";
import { CustomerCreatedEvent } from "./customer-created.event";
import { SendConsoleLog1WhenCustomerIsCreated } from "../handler/send-console-log-1-when-customer-is-created.handler";
import { Customer } from "../../entities/customer";
describe("[Domain events] - Customer Created", () => {
  let eventDispatcher: EventDispatcher;
  let eventHandler: SendConsoleLog1WhenCustomerIsCreated;

  beforeEach(() => {
    eventDispatcher = new EventDispatcher();
    eventHandler = new SendConsoleLog1WhenCustomerIsCreated();
  });

  afterEach(() => {
    eventDispatcher.unregisterAll();
  });

  it("should register and notify when user is created", () => {
    eventDispatcher.register("CustomerCreatedEvent", eventHandler);
    const spyNotify = jest.spyOn(eventDispatcher, "notify");

    const eventHandlersCustomerCreatedEvent =
      eventDispatcher.eventHandlers["CustomerCreatedEvent"];

    expect(eventHandlersCustomerCreatedEvent.length).toBe(1);
    expect(eventHandlersCustomerCreatedEvent).toContainEqual(eventHandler);

    const customer = new Customer({
      name: "Testing event after creating customer",
    });
    const customerEvent = new CustomerCreatedEvent({
      dateTimeOcurred: new Date(),
      customer: {
        id: customer.id,
        name: customer.name,
        active: customer.isActive,
      },
    });
    eventDispatcher.notify(customerEvent);
    expect(spyNotify).toHaveBeenCalled();
  });
});
