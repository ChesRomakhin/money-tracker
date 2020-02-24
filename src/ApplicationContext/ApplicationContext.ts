interface BeanDefinition {
  beanName: string;
  beanClass: any;
  dependencies: string[];
}

export class ApplicationContext {

  private context = new Map<string, any>();
  private beanDefinitions = new Map<string, BeanDefinition>();

  addBeanDefinition(beanName: string, beanClass: any, dependencies: string[]) {
    this.beanDefinitions.set(beanName, {
      beanName,
      beanClass,
      dependencies
    });
  }

  getBean<T>(beanName: string): T {
    if (this.context.has(beanName)) {
      return this.context.get(beanName);
    } else {
      const bean = this.createBean<T>(beanName);
      if (bean !== null) {
        this.context.set(beanName, bean);
        return bean;
      } else {
        throw Error(`No bean with name '${beanName}'`)
      }
    }
  }

  private createBean<T>(beanName: string): T {
    if (!this.beanDefinitions.has(beanName)) {
      throw new Error(`No bean definition found for '${beanName}'`)
    }

    const {beanClass, dependencies} = this.beanDefinitions.get(beanName) as BeanDefinition;

    const dependenciesArg = dependencies.map(dependency => ({beanName: dependency, bean: this.getBean(dependency)}))
      .reduce((accumulator, currentValue) => ({
        ...accumulator,
        [currentValue.beanName]: currentValue.bean,
      }), {} as any);

    console.warn(dependenciesArg);

    return new beanClass(dependenciesArg);
  }

}