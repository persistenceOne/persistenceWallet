import React from "react";

export interface InputTextTypes {
  className?: string;
  label: string;
  checked?: boolean;
  disable?: boolean;
  disabled?: boolean;
  id: string;
  onClick?: React.MouseEventHandler<HTMLLabelElement>;
}
