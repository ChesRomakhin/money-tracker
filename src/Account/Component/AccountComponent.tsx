import * as React from 'react';
import {Account} from "../Entity/Account";

interface AccountComponentProps {
  account: Account;
}

export const AccountComponent = (props: AccountComponentProps) => (<div>
  <span>🏦{props.account.name}</span>{' | '}
  <span>{props.account.amount}💰</span>
</div>);