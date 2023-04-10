import React from "react";
import CoinType from "../coinType";
import FileInput from "./file-input";
import Password from "./password";

const KeyStore = ({ setErrorMessage }: any) => {
  return (
    <>
      <FileInput setErrorMessage={setErrorMessage} />
      <Password setErrorMessage={setErrorMessage} />
      <CoinType />
    </>
  );
};

export default KeyStore;
