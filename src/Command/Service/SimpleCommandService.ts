import {CommandService} from "./CommandService";
import {Command} from "../Command";

export interface SimpleCommandServiceDependencies {
  commands: Command[]
}

export class SimpleCommandService implements CommandService {

  private commands: Command[];

  constructor(dependencies: SimpleCommandServiceDependencies) {
    this.commands = dependencies.commands;
  }

  submit(text: string): void {
    const command = this.commands.find(command => command.isApplicable(text));

    command?.execute(text);
  }

}