import {Repository} from "../Repository/Repository";
import {Account} from "./Account";
import {BehaviorSubject, Observable} from "rxjs";

interface AccountDependencies {
  accountRepository: Repository<string, Account>;
}

export class AccountService {

  private accountRepository: Repository<string, Account>;

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

  getAllAccounts(): Account[] {
    return this.accountRepository.getAll();
  }

  observeAccounts(): Observable<Account[]> {
    return this.accountsSubject.asObservable();
  }

  private produceAccounts() {
    this.accountsSubject.next([...this.accountRepository.getAll()]);
  }

}