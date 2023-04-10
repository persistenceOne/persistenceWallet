import { CopyToClipboard } from "react-copy-to-clipboard";
import React, { useState } from "react";
import { Icon } from "../../atoms/icon";
import Styles from "./styles.module.css";
import { IconTypes } from "./types";

const Copy = ({ id, customView = "" }: IconTypes) => {
  const [copyValue, setCopyValue] = useState(false);
  const onCopy = () => {
    setCopyValue(true);
    setTimeout(() => {
      setCopyValue(false);
    }, 1000);
  };
  return (
    <span className="relative flex items-center justify-center">
      <CopyToClipboard onCopy={onCopy} text={id}>
        {customView ? (
          copyValue ? (
            <span>Copied</span>
          ) : (
            customView
          )
        ) : (
          <span className={Styles.copyButton}>
            <Icon viewClass={Styles.copyIcon} iconName="copy" />
          </span>
        )}
      </CopyToClipboard>
      {!customView ? (
        <section className={`${Styles.copyResult} absolute`}>
          {copyValue ? <span>Copied</span> : null}
        </section>
      ) : (
        ""
      )}
    </span>
  );
};

export default Copy;
