import React from "react";

export interface SwitchTypes extends React.ComponentProps<"input"> {
  isOn?: boolean;
  color: string;
  className?: string;
  variant?: "large" | "medium" | "small";
}
