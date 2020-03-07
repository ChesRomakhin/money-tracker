import * as React from "react";
import {ApplicationContext} from "./ApplicationContext/ApplicationContext";
import {AccountListContainer} from "./Account/Containers/AccountListContainer";
import {CommandInput} from "./Command/Components/CommandInput";

interface AppProps {
  context: ApplicationContext;
}

export const ApplicationReactContext: React.Context<ApplicationContext> = React.createContext(null as any);

export const App: React.FC<AppProps> = (props: AppProps) => {
  return (<ApplicationReactContext.Provider value={props.context}>
    <CommandInput/>
    Test Accounts:
    <AccountListContainer/>
  </ApplicationReactContext.Provider>);
};
