import {ApplicationContext} from "./ApplicationContext/ApplicationContext";
import {AccountService} from "./Account/AccountService";
import {AccountInMemoryRepository} from "./Account/AccountInMemoryRepository";

export const buildContext = () => {
  const context = new ApplicationContext();
  context.addBeanDefinition('accountService', AccountService, ['accountRepository']);
  context.addBeanDefinition('accountRepository', AccountInMemoryRepository, []);

  return context;
}