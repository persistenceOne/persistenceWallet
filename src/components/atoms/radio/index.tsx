import React from "react";
import { InputTextTypes } from "./types";
import { emptyFunc } from "../../../helpers/utils";

const Radio = ({
  className,
  label = "text",
  onClick = emptyFunc,
  checked = false,
  disabled = false,
  id = "",
}: InputTextTypes) => {
  return (
    <div className={`flex items-center ${className}`}>
      <input
        type="radio"
        checked={checked}
        disabled={disabled}
        id={id}
        readOnly={true}
        className="w-4 h-4 text-[#E50913] bg-[#E50913] border-[#E50913] dark:ring-offset-gray-800 dark:border-gray-600"
      />
      <label
        htmlFor="default-radio-2"
        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        onClick={onClick}
      >
        {label}
      </label>
    </div>
  );
};
export default Radio;
