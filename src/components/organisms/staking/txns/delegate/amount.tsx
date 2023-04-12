import React from "react";
import { useAppStore } from "../../../../../../store/store";
import { shallow } from "zustand/shallow";
import InputText from "../../../../atoms/input";

const Amount = () => {
  const [amount] = useAppStore(
    (state) => [state.transactions.delegate.amount],
    shallow
  );

  const handleDelegateTxnAmount = useAppStore(
    (state) => state.handleDelegateTxnAmount
  );

  const handleAmount = (evt: any) => {
    let rex = /^\d{0,10}(\.\d{0,6})?$/;
    if (rex.test(evt.target.value)) {
      handleDelegateTxnAmount(evt.target.value);
    } else {
      return false;
    }
  };

  return (
    <div className="mb-4">
      <p className="text-light-white-500">Amount</p>
      <InputText
        type="text"
        placeholder="0.0"
        disable={false}
        required={true}
        onChange={handleAmount}
        value={amount.toString()}
        name="account"
        className={`w-full rounded-md`}
      />
    </div>
  );
};

export default Amount;
