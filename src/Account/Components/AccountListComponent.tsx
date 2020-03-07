import * as React from "react";
import {Account} from "../Account";
import {AccountComponent} from "./AccountComponent";

interface AccountListComponentProps {
  list: Account[];
}

export const AccountListComponent = (props: AccountListComponentProps) => (
  <div>
    {props.list.map(account => (<AccountComponent key={account.id} account={account}/>))}
  </div>
);