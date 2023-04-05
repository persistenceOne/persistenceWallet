import React, { useEffect, useState } from "react";
import { shallow } from "zustand/shallow";
import { useAppStore } from "../../../../../store/store";
import { makeHdPath } from "../../../../helpers/utils";
import { createKeyStore, createWallet } from "../../../../helpers/wallet";
import Button from "../../../atoms/button";

const ChangePassword = ({ resposne }: any) => {
  const [keyStoreGenerate, setKeyStoreGenerate] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [submitStatus, setSubmitStatus] = useState<boolean>(false);

  const handleSubmit = async () => {
    setSubmitStatus(true);
  };

  const downloadFile = async (jsonContent: any) => {
    const json = jsonContent;
    const fileName = "KeyStore";
    const blob = new Blob([json], { type: "application/json" });
    const href = await URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downLoadKeyStoreHandler = () => {
    let encryptedData = createKeyStore(resposne.mnemonic, password);
    let jsonContent = JSON.stringify(encryptedData.Response);
    downloadFile(jsonContent);
  };

  const previousHandler = () => {
    setKeyStoreGenerate(false);
  };

  const onChangePassword = (evt: any) => {
    const value = evt.target.value;
    const regex = /^\S{3}\S+$/;
    if (regex.test(value)) {
      setPassword(value);
      setErrorMessage("");
    } else {
      setErrorMessage(
        "Password must be greater than 3 letters and no spaces allowed"
      );
    }
  };

  return !submitStatus ? (
    <>
      <p className="mb-2 text-light-emphasis">
        <span className="block"> Address:</span>
        {resposne.address}
      </p>
      <div className="mb-2">
        <p className="mb-1">Password</p>
        <input
          disabled={false}
          onChange={onChangePassword}
          className="h-[40px] w-full p-2 rounded-sm"
          type="password"
          defaultValue=""
          required={true}
        />
      </div>
      <div className={"my-2 mt-4"}>
        <Button
          className="button md:text-sm flex items-center
            justify-center w-[150px] md:w-[200px] mx-auto mb-4"
          type="primary"
          size="medium"
          content="Submit"
          onClick={handleSubmit}
        />
      </div>
    </>
  ) : (
    <>
      <p
        onClick={downLoadKeyStoreHandler}
        className="bg-[#e9721c12] px-4 py-2 text-[#e9721c] cursor-pointer underline text-center my-4 "
      >
        Download New KeyStore File
      </p>
      <p>
        Note: Password encrypts your seed phrase. This password does not help
        you generate your seed phrase.
      </p>
    </>
  );
};

export default ChangePassword;
