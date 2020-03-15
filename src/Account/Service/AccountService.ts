import {Account} from "../Entity/Account";
import {Observable} from "rxjs";

export abstract class AccountService {

  public abstract createAccount(name: string): Account;
  public abstract createAccount(name: string, amount: number): Account;
  public abstract observeAccounts(): Observable<Account[]>;

}