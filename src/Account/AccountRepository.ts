import {Repository} from "../Repository/Repository";
import {Account} from "./Account";

export abstract class AccountRepository extends Repository<string, Account> {
}