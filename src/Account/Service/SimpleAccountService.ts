import {Account} from "../Entity/Account";
import {BehaviorSubject, Observable} from "rxjs";
import {AccountRepository} from "../Repository/AccountRepository";
import {AccountService} from "./AccountService";

interface SimpleAccountServiceDependencies {
  accountRepository: AccountRepository;
}

export class SimpleAccountService extends AccountService{

  private accountRepository: AccountRepository;

  private accountsSubject: BehaviorSubject<Account[]>;

  public constructor(dependencies: SimpleAccountServiceDependencies) {
    super();
    this.accountRepository = dependencies.accountRepository;
    this.accountsSubject = new BehaviorSubject<Account[]>(this.accountRepository.getAll());
  }

  public createAccount(name: string, amount = 0): Account {
    const newAccount = this.accountRepository.create({
      name,
      amount
    });

    this.produceAccounts();

    return newAccount;
  }

  public observeAccounts(): Observable<Account[]> {
    return this.accountsSubject.asObservable();
  }

  private produceAccounts() {
    this.accountsSubject.next(this.accountRepository.getAll());
  }

}