import React from "react";
import CoinType from "../coinType";
import FileInput from "./file-input";
import Password from "./password";
import Submit from "./submit";

const KeyStore = () => {
  return (
    <>
      <FileInput />
      <Password />
      <CoinType />
      <Submit />
    </>
  );
};

export default KeyStore;
