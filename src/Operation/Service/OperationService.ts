import {Operation} from "../Entity/Operation";

export abstract class OperationService {

  public abstract submit(operation: Partial<Operation>): void;

}