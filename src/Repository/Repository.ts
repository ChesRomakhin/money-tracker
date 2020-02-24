export interface SingleRepository<I, T> {

  create(entity: Partial<T>): T;

  get(id: I): T | null;

  update(entity: T): T;

  delete(id: I): void;

}

export interface ListRepository<I, T> {

  createAll(entities: T[]): T[];

  getAll(): T[];

  getAll(ids: I): T[];

  updateAll(entities: T[]): T[];

  deleteAll(ids: I): void;

}

export interface Repository<I, T> extends SingleRepository<I, T>, ListRepository<I, T> {
}