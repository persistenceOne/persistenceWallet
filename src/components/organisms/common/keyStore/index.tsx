import React from "react";
import CoinType from "../coinType";
import FileInput from "./file-input";
import Password from "./password";

const KeyStore = () => {
  return (
    <>
      <FileInput />
      <Password />
      <CoinType />
    </>
  );
};

export default KeyStore;
