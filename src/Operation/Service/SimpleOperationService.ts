import {Operation} from "../Entity/Operation";
import {OperationService} from "./OperationService";
import {OperationRepository} from "../Repository/OperationRepository";

interface Dependencies {
  operationRepository: OperationRepository;
}

export class SimpleOperationService extends OperationService {

  private operationRepository: OperationRepository;

  constructor(dependencies: Dependencies) {
    super();
    this.operationRepository = dependencies.operationRepository;
  }

  submit(operation: Partial<Operation>): void {
    this.operationRepository.create(operation);
  }

}