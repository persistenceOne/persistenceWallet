import React, { useState } from "react";
import InputText from "../../../../atoms/input";
import { useAppStore } from "../../../../../../store/store";
import { defaultChain, validateAddress } from "../../../../../helpers/utils";

const Recipient = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const handleSendTxnRecipient = useAppStore(
    (state) => state.handleSendTxnRecipient
  );
  const recipient = useAppStore((state) => state.transactions.send.recipient);

  const handleRecipient = (evt: any) => {
    handleSendTxnRecipient(evt.target.value);
    if (validateAddress(evt.target.value, defaultChain.prefix)) {
      setErrorMessage("");
    } else {
      setErrorMessage(`Unexpected prefix (expected: ${defaultChain.prefix})`);
    }
  };
  return (
    <div className="mb-4">
      <div>
        <p className="mb-1 text-light-white-500">Recipient</p>
        <InputText
          type="text"
          placeholder="recipient"
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
