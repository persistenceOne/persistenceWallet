import React, { useState } from "react";
import InputText from "../../../../atoms/input";
import { useAppStore } from "../../../../../../store/store";
import { shallow } from "zustand/shallow";
import { validateAddress } from "../../../../../helpers/utils";

const Recipient = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const handleSendIbcTxnRecipient = useAppStore(
    (state) => state.handleSendIbcTxnRecipient
  );
  const [recipient, chain] = useAppStore(
    (state) => [
      state.transactions.sendIbc.recipient,
      state.transactions.sendIbc.chain,
    ],
    shallow
  );
  const handleRecipient = (evt: any) => {
    handleSendIbcTxnRecipient(evt.target.value);
    if (validateAddress(evt.target.value, chain!.prefix)) {
      setErrorMessage("");
    } else {
      setErrorMessage(`Unexpected prefix (expected: ${chain!.prefix})`);
    }
  };
  return (
    <div className="mb-4">
      <div>
        <p className="mb-1 text-light-white-500">Recipient</p>
        <InputText
          type="text"
          placeholder={`${chain!.chainName.toLowerCase()}...`}
          disable={false}
          value={recipient}
          required={true}
          onChange={handleRecipient}
          name="recipient"
          className={`w-full rounded-md`}
        />
      </div>
      <p className={"text-sm text-red"}>{errorMessage}</p>
    </div>
  );
};

export default Recipient;
