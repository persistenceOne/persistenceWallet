import React from "react";
import ModalForm from "./ModalForm";
import ModalAddress from "./ModalAddress";
import { useSelector } from "react-redux";

const KeyStore = () => {
  const show = useSelector((state) => state.signInKeyStore.keyStoreResultModal);
  return (
    <>
      <ModalForm />
      {show ? <ModalAddress /> : ""}
    </>
  );
};

export default KeyStore;
