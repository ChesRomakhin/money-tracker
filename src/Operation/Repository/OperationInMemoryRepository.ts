import {Operation} from "../Entity/Operation";
import {v4} from "uuid";
import {OperationRepository} from "./OperationRepository";
import {OperationType} from "../Entity/OperationType";

export class OperationInMemoryRepository extends OperationRepository {

  private operations: Operation[] = [];

  constructor(dependencies: {}) {
    super();
    this.operations = [];
  }

  create(entity: Partial<Operation>): Operation {
    const newOperation: Operation = {
      amount: 0,
      type: OperationType.withdraw,
      additionalParameters: {},
      ...entity,
      id: v4()
    };

    this.operations.push(newOperation)

    return {...newOperation};
  }

  get(id: string): Operation | null {
    return this.operations.find((operation) => operation.id === id) ?? null;
  }

  update(entity: Operation): Operation {
    let updatedOperation: any = {};

    this.operations = this.operations.map((operation: Operation) => {
      if (operation.id === entity.id) {
        updatedOperation = {
          ...operation,
          ...entity
        };

        return updatedOperation;
      } else {
        return operation;
      }
    });

    return {
      ...updatedOperation
    }
  }

  delete(id: string): void {
    this.operations = this.operations.filter((operation: Operation) => operation.id !== id);
  }

  createAll(entities: Operation[]): Operation[] {
    return entities.map(entity => this.create(entity));
  }

  deleteAll(ids: string): void {
  }

  getAll(): Operation[];
  getAll(ids: string): Operation[];
  getAll(ids?: string): Operation[] {
    if (!ids) {
      return [...this.operations];
    } else {
      return this.operations.filter(operation => ids.indexOf(operation.id) !== -1);
    }
  }

  updateAll(entities: Operation[]): Operation[] {
    return [];
  }

}