import React from "react";
import { useAppStore } from "../../../../../store/store";
import InputText from "../../../atoms/input";

const Password = ({ setErrorMessage }: any) => {
  const [password] = useAppStore((state) => [state.wallet.keyStore.password]);
  const handleWalletKeyStoreFilePassword = useAppStore(
    (state) => state.handleWalletKeyStoreFilePassword
  );
  const onChange = (evt: any) => {
    const value = evt.target.value;
    const regex = /^\S{3}\S+$/;
    handleWalletKeyStoreFilePassword(evt.target.value);
    if (regex.test(value)) {
      setErrorMessage("");
    } else {
      setErrorMessage(
        "Password must be greater than 3 letters and no spaces allowed"
      );
    }
  };

  return (
    <div className="mb-2">
      <p className="mb-1 text-light-white-500">Password</p>
      <InputText
        type="password"
        placeholder=""
        disable={false}
        required={true}
        onChange={onChange}
        name="password"
        value={password}
        className={`w-full rounded-md`}
      />
    </div>
  );
};

export default Password;
