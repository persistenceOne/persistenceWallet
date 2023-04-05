import React from "react";
import Button from "../../atoms/button";
import NavigationBar from "../homePageNav";
import { useAppStore } from "../../../../store/store";
import CreateWallet from "./create-wallet";

const GenerateKeyStore = () => {
  const handleCreateWalletModal = useAppStore(
    (state) => state.handleCreateWalletModal
  );

  const onChange = () => {};

  return (
    <div className="">
      <div className="mb-2">
        <p className="mb-1">Mnemonic</p>
        <textarea name="postContent" rows={3} />
      </div>

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
    </div>
  );
};

export default GenerateKeyStore;
