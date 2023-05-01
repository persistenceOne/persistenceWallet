import React, { ChangeEvent, useState } from "react";
import InputText from "../../../atoms/input";
import { Icon } from "../../../atoms/icon";
import { useAppStore } from "../../../../../store/store";
import { MAX_ACCOUNT_NUMBER } from "../../../../../appConstants";

const Memo = () => {
  const handleTxnMemoValue = useAppStore((state) => state.handleTxnMemoValue);
  const memo = useAppStore((state) => state.transactions.memo);

  const handleMemo = (evt: any) => {
    handleTxnMemoValue(evt.target.value);
  };

  return (
    <div className="mb-2">
      <p className="text-light-white-500">Memo (Optional)</p>
      <InputText
        type="text"
        placeholder=""
        disable={false}
        required={true}
        onChange={handleMemo}
        value={memo}
        name="account"
        className={`w-full rounded-md`}
      />
    </div>
  );
};

export default Memo;
