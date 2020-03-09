import {Account} from "./Account";
import {BehaviorSubject, Observable} from "rxjs";
import {AccountRepository} from "./AccountRepository";

interface AccountDependencies {
  accountRepository: AccountRepository;
}

export class AccountService {

  private accountRepository: AccountRepository;

  private accountsSubject: BehaviorSubject<Account[]>;

  constructor(dependencies: AccountDependencies) {
    this.accountRepository = dependencies.accountRepository;
    this.accountsSubject = new BehaviorSubject<Account[]>(this.accountRepository.getAll());
  }

  createAccount(name: string, amount = 0): Account {
    const newAccount = this.accountRepository.create({
      name,
      amount
    });

    this.produceAccounts();

    return newAccount;
  }

  observeAccounts(): Observable<Account[]> {
    return this.accountsSubject.asObservable();
  }

  private produceAccounts() {
    this.accountsSubject.next(this.accountRepository.getAll());
  }

}