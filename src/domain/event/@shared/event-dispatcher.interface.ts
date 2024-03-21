import { EventHandlerInterface } from "./event-handler.interface";
import { EventInterface } from "./event.interface";

export abstract class EventDispatcherInterface {
  abstract notify(event: EventInterface): void;
  abstract register(eventName: string, handler: EventHandlerInterface): void;
  abstract unregister(eventName: string, handler: EventHandlerInterface): void;
  abstract unregisterAll(): void;
}
