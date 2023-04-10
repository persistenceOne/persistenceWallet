import React from "react";
import { useAppStore } from "../../../../../store/store";

const Password = ({ setErrorMessage }: any) => {
  const handleWalletKeyStoreFilePassword = useAppStore(
    (state) => state.handleWalletKeyStoreFilePassword
  );
  const onChange = (evt: any) => {
    const value = evt.target.value;
    const regex = /^\S{3}\S+$/;
    if (regex.test(value)) {
      handleWalletKeyStoreFilePassword(evt.target.value);
      setErrorMessage("");
    } else {
      setErrorMessage(
        "Password must be greater than 3 letters and no spaces allowed"
      );
    }
  };
  return (
    <div className="mb-2">
      <p className="mb-1">Password</p>
      <input
        disabled={false}
        onChange={onChange}
        className="h-[40px] w-full p-2 rounded-sm"
        type="password"
        defaultValue=""
        required={true}
      />
    </div>
  );
};

export default Password;
