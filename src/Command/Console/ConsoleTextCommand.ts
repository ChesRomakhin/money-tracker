import {Command} from "../Command";

export class ConsoleTextCommand extends Command {

  private commandRegexp = /console\s+(info|warn|error)\s+(.*)/gis;

  execute(text: string): void {
    this.commandRegexp.lastIndex = 0;
    const execArray: RegExpExecArray = this.commandRegexp.exec(text) as RegExpExecArray;

    ((console[execArray[1] as (keyof Console)]) as Function)(execArray[2]);
  }

  isApplicable(text: string): boolean {
    this.commandRegexp.lastIndex = 0;
    return this.commandRegexp.test(text);
  }

}