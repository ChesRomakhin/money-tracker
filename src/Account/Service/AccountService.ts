import {Account} from "../Entity/Account";
import {Observable} from "rxjs";

export abstract class AccountService {

  public abstract createAccount(name: string): Account;
  public abstract createAccount(name: string, amount: number): Account;
  public abstract observeAccounts(): Observable<Account[]>;

  public abstract findAccountByName(name: string): Account | null;

  public abstract deposit(amount: number, account: Account): void;

}