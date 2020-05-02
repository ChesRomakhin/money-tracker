import {Command} from "../Command";
import {AccountService} from "../../Account/Service/AccountService";

interface Dependencies {
  accountService: AccountService;
}

export class DepositCommand extends Command {

  private commandRegExp = /deposit\s+(\d+(\.\d+)?)\s+to\s+(.+)/gis;
  private accountService: AccountService;

  constructor(dependencies: Dependencies) {
    super();
    this.accountService = dependencies.accountService;
  }

  execute(text: string): void {
    this.commandRegExp.lastIndex = 0;
    const execArray = this.commandRegExp.exec(text) as RegExpExecArray;

    const amount = Number(execArray[1]);
    if (!isFinite(amount)) {
      return;
    }

    const account = this.accountService.findAccountByName(execArray[3]);
    if (account) {
      this.accountService.deposit(amount, account);
    }
  }

  isApplicable(text: string): boolean {
    this.commandRegExp.lastIndex = 0;
    return this.commandRegExp.test(text);
  }

}