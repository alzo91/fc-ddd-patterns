import { EventDispatcher } from "../@shared/event-dispatcher";
import { SendConsoleLog2WhenCustomerChangedAddress } from "../handler/send-console-log-2-when-customer-changed-address.handler";
import { Customer } from "../../entities/customer";
import { Address } from "../../entities/address";
import { CustomerAddressChangedEvent } from "./customer-address-changed.event";

describe("[Domain events] - Customer has changed address", () => {
  let eventDispatcher: EventDispatcher;
  let eventHandler: SendConsoleLog2WhenCustomerChangedAddress;

  beforeEach(() => {
    eventDispatcher = new EventDispatcher();
    eventHandler = new SendConsoleLog2WhenCustomerChangedAddress();
  });

  afterEach(() => {
    eventDispatcher.unregisterAll();
  });

  it("should notify when customer changes address", () => {
    // It is monitoring the function notify
    const spyNotifyChangedAddress = jest.spyOn(eventDispatcher, "notify");

    // Register events
    const event_name = "CustomerAddressChangedEvent";
    eventDispatcher.register(event_name, eventHandler);

    const events_registered = eventDispatcher.eventHandlers[event_name];

    // Validate if events has been registered
    expect(events_registered.length).toBe(1);
    expect(events_registered).toContainEqual(eventHandler);

    const old_address = new Address({
      city: "São Paulo",
      state: "SP",
      zip_code: "Zipcode 001",
      neighborhood: "Zona Sul",
      street: "Street",
    });

    const customer = new Customer({
      name: "Customer for changed address",
      address: old_address,
    });

    const new_address = new Address({
      city: "Campinas",
      state: "SP",
      zip_code: "zipcode 001",
      neighborhood: "jd. maisa",
      street: "new street, 415",
    });

    customer.changeAddress(new_address);
    customer.activate();

    // Creating event with updates
    const changeAddressEvent = new CustomerAddressChangedEvent({
      customer: { id: customer.id, name: customer.name },
      new_address,
      old_address,
    });

    eventDispatcher.notify(changeAddressEvent);
    expect(spyNotifyChangedAddress).toHaveBeenCalled();
  });
});
