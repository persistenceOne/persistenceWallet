import React from "react";
import { SpinnerTypes } from "./types";
import styles from "./styles.module.css";

export const Spinner = ({ size = "medium" }: SpinnerTypes) => (
  <span
    className={` ${styles[size]} spinner light icon-toast inline-block align-text-bottom rounded-full`}
  />
);
