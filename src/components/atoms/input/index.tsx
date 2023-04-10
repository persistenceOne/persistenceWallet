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
  disable = false,
  ...rest
}: InputTextTypes) => {
  const styles =
    "bg-black-600 px-4 py-3 text-light-emphasis leading-normal box-shadow-none font-normal " +
    "placeholder:text-light-mid placeholder:leading-normal placeholder:font-normal outline-none";
  return (
    <div className="flex flex-1 justify-end">
      <input
        type={type}
        className={`${styles} ${className}`}
        name={name}
        placeholder={placeholder}
        autoFocus={autofocus}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disable}
        onWheel={(e) => (e.target as HTMLInputElement).blur()}
        {...rest}
      />
      <p className="error">{error}</p>
    </div>
  );
};
export default InputText;
