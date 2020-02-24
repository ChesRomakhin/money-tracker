import * as React from 'react';
import {ApplicationContext} from "./ApplicationContext/ApplicationContext";
import {AccountListContainer} from "./Account/Containers/AccountListContainer";

interface AppProps {
  context: ApplicationContext;
}

export const ApplicationReactContext: React.Context<ApplicationContext> = React.createContext(null as any);

export const App: React.FC<AppProps> = (props: AppProps) => {
  return (<ApplicationReactContext.Provider value={props.context}>
    Test Accounts:
    <AccountListContainer/>
  </ApplicationReactContext.Provider>);
};
