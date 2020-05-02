export abstract class CommandService {

  abstract submit(text: string): void;

  abstract getApplicableCommands(text: string): string[];

}