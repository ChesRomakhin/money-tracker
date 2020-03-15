import {Command} from "../Command";
import {AccountService} from "../../Account/Service/AccountService";
import {Account} from "../../Account/Entity/Account";

interface SpendCommandDependencies {
  accountService: AccountService;
}

export class SpendCommand extends Command {

  private readonly commandRegexp = /spend\s+(\d+([,.]\d*)?)\s+from\s+(.*)/gis;

  private accountService: AccountService;
  private accounts: Account[] = [];

  constructor(dependencies: SpendCommandDependencies) {
    super();
    this.accountService = dependencies.accountService;
    this.accountService.observeAccounts().subscribe((accounts) => this.accounts);
  }

  execute(text: string): void {
    super.execute(text);
  }

  isApplicable(text: string): boolean {
    this.commandRegexp.lastIndex = 0;
    return this.commandRegexp.test(text);
  }

  private setAccounts(accounts: Account[]) {
    this.accounts = accounts;
  }

}