import {ApplicationContext} from "./GreenBean/ApplicationContext/ApplicationContext";
import {AccountInMemoryRepository} from "./Account/Repository/AccountInMemoryRepository";
import {Command} from "./Command/Command";
import {ConsoleTextCommand} from "./Command/Console/ConsoleTextCommand";
import {SimpleCommandService} from "./Command/Service/SimpleCommandService";
import {CreateAccountCommand} from "./Command/Create/CreateAccountCommand";
import {SimpleAccountService} from "./Account/Service/SimpleAccountService";

export const buildContext = () => {
  const context = new ApplicationContext();
  context.addBeanDefinition("accountService", SimpleAccountService, ["accountRepository"]);
  context.addBeanDefinition("accountRepository", AccountInMemoryRepository, []);

  context.addBeanDefinition("consoleTextCommand", ConsoleTextCommand, []);
  context.addBeanDefinition("createAccountCommand", CreateAccountCommand, ["accountService"]);

  context.addBeanDefinition("commandService", SimpleCommandService, [{dependencyName: "commands", beanClass: Command}]);

  (window as any).applicationContext = context;

  return context;
};