import * as React from "react";
import {useState} from "react";
import {CommandService} from "../Service/CommandService";
import {useGreenBean} from "../../GreenBean/React/hook/useGreenBean";

export const CommandInput = () => {
  const [value, setValue] = useState<string>("");
  const commandService = useGreenBean<CommandService>("commandService");

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