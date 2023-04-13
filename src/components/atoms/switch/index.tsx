import React from "react";
import { SwitchTypes } from "./types";
import { emptyFunc } from "../../../helpers/utils";
import styles from "./styles.module.css";

const ToggleSwitch = ({
  color,
  isOn,
  onChange = emptyFunc,
  variant = "small",
}: SwitchTypes) => {
  return (
    <>
      <input
        checked={isOn}
        onChange={onChange}
        type="checkbox"
        id={"react-switch-new"}
        className="react-switch-checkbox"
      />
      <label
        className={`${styles[variant]} ${
          isOn ? `!bg-red` : ""
        } react-switch-label`}
        htmlFor={"react-switch-new"}
      >
        <span className={`${styles[variant + `Inner`]} react-switch-button`} />
      </label>
    </>
  );
};

export default ToggleSwitch;
