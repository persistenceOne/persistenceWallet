import React from "react";
import InputText from "../../../../atoms/input";
import { useAppStore } from "../../../../../../store/store";

const Recipient = () => {
  const handleSendIbcTxnRecipient = useAppStore(
    (state) => state.handleSendIbcTxnRecipient
  );
  const recipient = useAppStore(
    (state) => state.transactions.sendIbc.recipient
  );
  const handleRecipient = (evt: any) => {
    handleSendIbcTxnRecipient(evt.target.value);
  };
  return (
    <div className="">
      <div className="mb-4">
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
    </div>
  );
};

export default Recipient;
