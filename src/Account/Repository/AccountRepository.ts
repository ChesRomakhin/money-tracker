import {Repository} from "../../GreenBean/Repository/Repository";
import {Account} from "../Entity/Account";

export abstract class AccountRepository extends Repository<string, Account> {
}