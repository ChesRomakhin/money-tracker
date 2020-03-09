import {Account} from "./Account";
import {v4} from "uuid";
import {AccountRepository} from "./AccountRepository";

export class AccountInMemoryRepository extends AccountRepository {

  private accounts: Account[] = [];

  constructor(dependencies: {}) {
    super();
    this.accounts = [];
  }

  create(entity: Partial<Account>): Account {
    const newAccount: Account = {
      name: 'Untitled',
      amount: 0,
      ...entity,
      id: v4()
    };

    this.accounts.push(newAccount)

    return {...newAccount};
  }

  get(id: string): Account | null {
    return this.accounts.find((account) => account.id === id) ?? null;
  }

  update(entity: Account): Account {
    let updatedAccount: any = {};

    this.accounts = this.accounts.map((account: Account) => {
      if (account.id === entity.id) {
        updatedAccount = {
          ...account,
          ...entity
        };

        return updatedAccount;
      } else {
        return account;
      }
    });

    return {
      ...updatedAccount
    }
  }

  delete(id: string): void {
    this.accounts = this.accounts.filter((account: Account) => account.id !== id);
  }

  createAll(entities: Account[]): Account[] {
    return entities.map(entity => this.create(entity));
  }

  deleteAll(ids: string): void {
  }

  getAll(): Account[];
  getAll(ids: string): Account[];
  getAll(ids?: string): Account[] {
    if (!ids) {
      return [...this.accounts];
    } else {
      return this.accounts.filter(account => ids.indexOf(account.id) !== -1);
    }
  }

  updateAll(entities: Account[]): Account[] {
    return [];
  }

}