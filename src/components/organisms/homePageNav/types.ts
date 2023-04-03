import React from "react";
import { Networks } from "../../../helpers/config";

export interface AppButtonProps extends React.ComponentProps<"button"> {
  buttonType?: "primary" | "secondary" | "tertiary";
  size?: "large" | "medium" | "small";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
}

export interface MenuOption {
  value: string;
}

export interface MenuSelectProps {
  options: MenuOption[];
  selectedOption?: string;
  onSelect: (optionId: string) => void;
  icon?: React.ReactNode;
}

export interface NetworkInfo {
  network: Networks;
  logo: string;
}
