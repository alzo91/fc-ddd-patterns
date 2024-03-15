export abstract class RepositoryInterface<T> {
  abstract create(entity: T): Promise<void>;
  abstract update(entity: T): Promise<void>;
  abstract find(id: string): Promise<T | null>;
  abstract findAll(): Promise<T[]>;
}
