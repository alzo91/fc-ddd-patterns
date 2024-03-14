export abstract class RepositoryInterface<T> {
  abstract create(data: T): Promise<void>;
  abstract update(data: T): Promise<void>;
  abstract find(id: string): Promise<T | undefined>;
  abstract findAll(): Promise<T[]>;
}
