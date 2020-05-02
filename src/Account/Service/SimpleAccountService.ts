import {Account} from "../Entity/Account";
import {BehaviorSubject, Observable} from "rxjs";
import {AccountRepository} from "../Repository/AccountRepository";
import {AccountService} from "./AccountService";
import {OperationService} from "../../Operation/Service/OperationService";
import {OperationType} from "../../Operation/Entity/OperationType";

interface SimpleAccountServiceDependencies {
  accountRepository: AccountRepository;
  operationService: OperationService;
}

export class SimpleAccountService extends AccountService {

  private operationService: OperationService;
  private accountRepository: AccountRepository;

  private accountsSubject: BehaviorSubject<Account[]>;

  public constructor(dependencies: SimpleAccountServiceDependencies) {
    super();
    this.accountRepository = dependencies.accountRepository;
    this.operationService = dependencies.operationService;
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

  public findAccountByName(name: string): Readonly<Account> | null {
    const account = this.accountRepository.getAll().find(account => account.name === name);

    return account ?? null;
  }

  public deposit(amount: number, account: Account) {
    const repositoryAccount = this.accountRepository.get(account?.id ?? '');
    if (repositoryAccount) {
      const newAccount = {
        ...repositoryAccount,
        amount: repositoryAccount.amount + amount
      };
      this.accountRepository.update(newAccount);

      this.operationService.submit({
        type: OperationType.receipt,
        amount,
        additionalParameters: {
          account: repositoryAccount.id,
        }
      });

      this.produceAccounts();
    }

  }

  private produceAccounts() {
    this.accountsSubject.next(this.accountRepository.getAll());
  }

}