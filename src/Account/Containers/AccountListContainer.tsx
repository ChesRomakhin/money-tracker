import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {AccountListComponent} from "../Components/AccountListComponent";
import {ApplicationReactContext} from "../../App";
import {AccountService} from "../AccountService";
import {Account} from "../Account";
import {Observable} from "rxjs";
import {useObservable} from "../../hook/useObservable";

export const AccountListContainer = () => {
  const applicationContext = useContext(ApplicationReactContext);
  const accountService = applicationContext.getBeanByName<AccountService>("accountService");
  const [observable, setObservable] = useState<Observable<Account[]>>(accountService.observeAccounts());

  useEffect(() => {
    setObservable(accountService.observeAccounts());
  }, [accountService]);

  const list = useObservable<Account[]>(observable);

  return <AccountListComponent list={list ?? []}/>;
};