import {Command} from "../Command";
import {AccountService} from "../../Account/Service/AccountService";

interface Dependencies {
  accountService: AccountService;
}

export class CreateAccountCommand extends Command {

  private commandRegExp = /create\s+account\s+(.*)/gis
  private accountService: AccountService;

  constructor(dependencies: Dependencies) {
    super();
    this.accountService = dependencies.accountService;
  }

  execute(text: string): void {
    this.commandRegExp.lastIndex = 0;
    const execArray = this.commandRegExp.exec(text) as RegExpExecArray;

    this.accountService.createAccount(execArray[1]);
  }

  isApplicable(text: string): boolean {
    this.commandRegExp.lastIndex = 0;
    return this.commandRegExp.test(text);
  }

}