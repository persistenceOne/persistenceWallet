import React from "react";

export interface ButtonLinkProps {
  type?: "primary" | "secondary" | "tertiary" | "custom";
  size?: "large" | "medium" | "small";
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  loading?: boolean;
  content?: React.ReactNode | string;
  disabled?: boolean;
  className?: string;
  link: string;
  target?: string;
}
