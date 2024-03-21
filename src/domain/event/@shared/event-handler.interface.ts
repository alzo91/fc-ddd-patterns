import { EventInterface } from "./event.interface";

export abstract class EventHandlerInterface<
  T extends EventInterface = EventInterface
> {
  abstract handle(event: T): Promise<void>;
}
