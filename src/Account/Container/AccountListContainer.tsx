import * as React from "react";
import {useEffect, useState} from "react";
import {AccountListComponent} from "../Component/AccountListComponent";
import {AccountService} from "../Service/AccountService";
import {Account} from "../Entity/Account";
import {useObservable} from "../../hook/useObservable";
import {useGreenBean} from "../../GreenBean/React/hook/useGreenBean";
import {Observable} from "rxjs";

export const AccountListContainer = () => {
  const accountService = useGreenBean<AccountService>("accountService");
  const [observable, setObservable] = useState<Observable<Account[]>>(accountService.observeAccounts());

  useEffect(() => {
    setObservable(accountService.observeAccounts());
  }, [accountService]);

  const list = useObservable<Account[]>(observable);

  return <AccountListComponent list={list ?? []}/>;
};