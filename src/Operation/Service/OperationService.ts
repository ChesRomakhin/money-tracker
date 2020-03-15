import {Operation} from "../Entity/Operation";

export abstract class OperationService {

  public abstract submit(operation: Operation): void;

}