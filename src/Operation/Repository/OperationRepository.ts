import {Repository} from "../../GreenBean/Repository/Repository";
import {Operation} from "../Entity/Operation";

export abstract class OperationRepository extends Repository<string, Operation> {
}