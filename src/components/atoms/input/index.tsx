import React from "react";
import { InputTextTypes } from "./types";
import { emptyFunc } from "../../../helpers/utils";

const InputText = ({
  autofocus = false,
  className,
  error,
  name,
  placeholder,
  required = true,
  type = "text",
  value,
  onChange = emptyFunc,
  disable = false
}: InputTextTypes) => {
  return (
    <div className="flex flex-1 justify-end">
      <input
        type={type}
        className={className}
        name={name}
        placeholder={placeholder}
        autoFocus={autofocus}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disable}
        onWheel={(e) => (e.target as HTMLInputElement).blur()}
      />
      <p className="error">{error}</p>
    </div>
  );
};
export default InputText;
