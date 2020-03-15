import * as React from "react";
import {ApplicationContext} from "./GreenBean/ApplicationContext/ApplicationContext";
import {AccountListContainer} from "./Account/Container/AccountListContainer";
import {CommandInput} from "./Command/Components/CommandInput";
import {GreenBeanReactContext} from "./GreenBean/React/GreenBeanReactContext";

interface AppProps {
  context: ApplicationContext;
}

export const App: React.FC<AppProps> = (props: AppProps) => {
  return (<GreenBeanReactContext.Provider value={props.context}>
    <CommandInput/>
    Test Accounts:
    <AccountListContainer/>
  </GreenBeanReactContext.Provider>);
};
