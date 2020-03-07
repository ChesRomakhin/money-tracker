import * as React from "react";
import {useContext, useState} from "react";
import {ApplicationReactContext} from "../../App";
import {CommandService} from "../Service/CommandService";

export const CommandInput = () => {
  const [value, setValue] = useState<string>("");

  const applicationContext = useContext(ApplicationReactContext);
  const commandService = applicationContext.getBeanByName<CommandService>("commandService");

  return (<div>
    <span>privet</span>
    <form onSubmit={(event) => {
      event.stopPropagation();
      event.preventDefault();
      commandService.submit(value);
    }}>
      <input value={value}
             type={"text"}
             onChange={event => setValue(event.target.value)}/>
    </form>
  </div>);
};