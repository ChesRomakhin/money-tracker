import {Repository} from "../Repository/Repository";
import {Account} from "./Account";

interface AccountDependencies {
  accountRepository: Repository<string, Account>;
}

export class AccountService {

  private accountRepository: Repository<string, Account>;

  constructor(dependencies: AccountDependencies) {
    this.accountRepository = dependencies.accountRepository;
  }

  createAccount(name: string, amount = 0): Account {
    return this.accountRepository.create({
      name,
      amount
    });
  }

  getAllAccounts(): Account[] {
    return this.accountRepository.getAll();
  }

}