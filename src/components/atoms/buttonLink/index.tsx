import styles from "./styles.module.css";
import React from "react";
import { ButtonLinkProps } from "./types";
import { emptyFunc } from "../../../helpers/utils";

export const ButtonLink = ({
  link = "",
  content,
  className,
  type = "primary",
  size = "medium",
  onClick = emptyFunc,
  target = "_blank"
}: ButtonLinkProps) => {
  return (
    <a
      href={link}
      onClick={onClick}
      target={target}
      className={`py-2.5 px-4 ${styles.appButton} ${styles[type]} ${size} ${className}`}
    >
      {content}
    </a>
  );
};

export default ButtonLink;
