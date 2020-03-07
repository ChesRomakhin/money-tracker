export class Command {

  execute(text: string): void {
    throw Error('Not implemented');
  }

  isApplicable(text: string): boolean {
    throw Error('Not implemented');
  }

}