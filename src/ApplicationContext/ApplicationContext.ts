interface ComplexBeanDependency {
  dependencyName: string;
  beanClass: any;
}

type BeanDependency = string | ComplexBeanDependency;

interface BeanDefinition {
  beanName: string;
  beanClass: any;
  dependencies: BeanDependency[];
}

interface ResolvedDependency {
  name: string;
  value: any;
}

export class ApplicationContext {

  private context = new Map<string, any>();
  private beanDefinitions = new Map<string, BeanDefinition>();

  addBeanDefinition(beanName: string, beanClass: any, dependencies: BeanDependency[]) {
    this.beanDefinitions.set(beanName, {
      beanName,
      beanClass,
      dependencies
    });
  }

  getBeanByName<T>(beanName: string): T {
    if (this.context.has(beanName)) {
      return this.context.get(beanName);
    } else {
      const bean = this.createBean<T>(beanName);
      if (bean !== null) {
        this.context.set(beanName, bean);
        return bean;
      } else {
        throw Error(`No bean with name '${beanName}'`);
      }
    }
  }

  private resolveDependency(dependency: BeanDependency): ResolvedDependency {
    if (typeof dependency === "string") {
      return {name: dependency, value: this.getBeanByName(dependency as string)};
    } else {
      return {name: dependency.dependencyName, value: this.getBeansByClass(dependency.beanClass)};
    }
  }

  getBeansByClass(type: any): any[] {
    const beans: any[] = [];

    for (const [name, definition] of this.beanDefinitions) {
      if (type.isPrototypeOf(definition.beanClass)) {
        beans.push(this.getBeanByName(name));
      }
    }

    return beans;
  }

  private createBean<T>(beanName: string): T {
    if (!this.beanDefinitions.has(beanName)) {
      throw new Error(`No bean definition found for '${beanName}'`);
    }

    const {beanClass, dependencies} = this.beanDefinitions.get(beanName) as BeanDefinition;

    const dependenciesArg = dependencies.map(dependency => this.resolveDependency(dependency))
      .reduce((accumulator, currentValue) => ({
        ...accumulator,
        [currentValue.name]: currentValue.value
      }), {} as any);

    return new beanClass(dependenciesArg);
  }

}