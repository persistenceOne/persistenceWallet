import styles from "./styles.module.css";
import React from "react";
import { ButtonProps } from "./types";
import { emptyFunc } from "../../../helpers/utils";

export const Button = ({
  onClick,
  content,
  disabled = false,
  className,
  type = "primary",
  size = "medium",
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`py-2.5 px-4 ${styles.appButton} ${styles[type]} ${size} ${className}`}
    >
      {content}
    </button>
  );
};

export default Button;
