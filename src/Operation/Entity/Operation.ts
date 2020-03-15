import {OperationType} from "./OperationType";

export interface Operation {
  id: string;
  type: OperationType;
  amount: number;
  additionalParameters: Record<string, any>
}