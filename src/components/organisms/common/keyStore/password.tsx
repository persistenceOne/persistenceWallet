import React from "react";
import { useAppStore } from "../../../../../store/store";

const Password = () => {
  const handleWalletKeyStoreFilePassword = useAppStore(
    (state) => state.handleWalletKeyStoreFilePassword
  );
  const onChange = (evt: any) => {
    handleWalletKeyStoreFilePassword(evt.target.value);
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
