export abstract class SingleRepository<I, T> {

  abstract create(entity: Partial<T>): T;

  abstract get(id: I): T | null;

  abstract update(entity: T): T;

  abstract delete(id: I): void;

}

export abstract class ListRepository<I, T> {

  abstract createAll(entities: T[]): T[];

  abstract getAll(): T[];

  abstract getAll(ids: I): T[];

  abstract updateAll(entities: T[]): T[];

  abstract deleteAll(ids: I): void;

}

interface IRepository<I, T> extends SingleRepository<I, T>, ListRepository<I, T> {
}

export abstract class Repository<I, T> implements IRepository<I, T>{
  abstract create(entity: Partial<T>): T;

  abstract createAll(entities: T[]): T[];

  abstract delete(id: I): void;

  abstract deleteAll(ids: I): void;

  abstract get(id: I): T | null;

  abstract getAll(): T[];
  abstract getAll(ids: I): T[];

  abstract update(entity: T): T;

  abstract updateAll(entities: T[]): T[];

}