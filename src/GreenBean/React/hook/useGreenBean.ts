import {useContext, useEffect, useState} from "react";
import {GreenBeanReactContext} from "../GreenBeanReactContext";

export const useGreenBean: <T> (beanName: string) => T = <T> (beanName: string): T => {
  const applicationContext = useContext(GreenBeanReactContext);
  const [bean, setBean] = useState<T>(applicationContext.getBeanByName<T>(beanName));

  useEffect(() => {
    const bean = applicationContext.getBeanByName<T>(beanName);
    setBean(bean);
  }, [applicationContext, beanName])

  return bean;
}