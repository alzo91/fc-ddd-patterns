import { EventDispatcher } from "./event-dispatcher";

import { SendEmailWhenProductIsCreatedHandler } from "../handler/send-email-when-product-is-created.handler";
import { ProductCreatedEvent } from "../product/product-created.event";
import { Product } from "../../entities/product";

describe("Domain events tests", () => {
  let eventDispatcher: EventDispatcher;
  let eventHandler: SendEmailWhenProductIsCreatedHandler;

  beforeEach(() => {
    eventDispatcher = new EventDispatcher();
    eventHandler = new SendEmailWhenProductIsCreatedHandler();
  });

  afterEach(() => {
    eventDispatcher.unregisterAll();
  });

  it("should register an event handler", () => {
    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    const eventHandlersProductCreatedEvent =
      eventDispatcher.eventHandlers["ProductCreatedEvent"];

    expect(eventHandlersProductCreatedEvent).toBeTruthy();
    expect(eventHandlersProductCreatedEvent.length).toBe(1);
    expect(eventHandlersProductCreatedEvent).toContainEqual(eventHandler);
  });

  it("should unregister an event handler", () => {
    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.eventHandlers["ProductCreatedEvent"].length).toBe(1);

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.eventHandlers["ProductCreatedEvent"].length).toBe(0);
    expect(
      eventDispatcher.eventHandlers["ProductCreatedEvent"]
    ).not.toContainEqual(eventHandler);
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();

    eventDispatcher.register(
      "ProductCreatedEvent",
      new SendEmailWhenProductIsCreatedHandler()
    );
    eventDispatcher.register(
      "ProductCreatedEvent",
      new SendEmailWhenProductIsCreatedHandler()
    );
    eventDispatcher.register(
      "ProductCreatedEvent",
      new SendEmailWhenProductIsCreatedHandler()
    );

    expect(eventDispatcher.eventHandlers["ProductCreatedEvent"].length).toBe(3);

    eventDispatcher.unregisterAll();
    expect(eventDispatcher.eventHandlers["ProductCreatedEvent"]).toBeFalsy();
  });

  it("should notify all event handlers of an event", () => {
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.eventHandlers["ProductCreatedEvent"].length).toBe(1);

    const product = new Product({ name: "Mouse", price: 1 });

    const productCreatedEvent = new ProductCreatedEvent({
      dateTimeOcurred: new Date(),
      payload: product,
    });

    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
