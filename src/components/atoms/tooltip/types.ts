import React from "react";

export interface TooltipTypes {
  title?: string | React.ReactNode;
  children?: React.ReactNode;
  position: string;
  containerClass?: "";
  theme?: string;
}
