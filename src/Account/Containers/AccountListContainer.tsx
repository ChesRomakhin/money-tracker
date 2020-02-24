import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import {AccountListComponent} from "../Components/AccountListComponent";
import {ApplicationReactContext} from "../../App";
import {AccountService} from "../AccountService";
import {Account} from "../Account";


export const AccountListContainer = () => {
  const [list, setList] = useState<Account[]>([]);
  const applicationContext = useContext(ApplicationReactContext);
  useEffect(() => {
    const accountService = applicationContext.getBean<AccountService>('accountService');
    const accounts = accountService.getAllAccounts();
    setList(accounts);

  }, [applicationContext])

  return (
    <AccountListComponent list={list}/>
  );
};