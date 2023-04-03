import React from "react";
import { IconProps } from "./types";
import styles from "./styles.module.css";

const symbol_defs = "/images/symbols.svg";

export const Icon = (props: IconProps) => {
  return (
    <svg
      viewBox={props.viewBox ? props.viewBox : "0 0 16 16"}
      className={`${styles.icon} ${props.viewClass}`}
    >
      <use xlinkHref={`${symbol_defs}#icon-${props.iconName}`} />
    </svg>
  );
};
