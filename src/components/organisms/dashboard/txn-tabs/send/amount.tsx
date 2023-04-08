import React from "react";
import InputText from "../../../../atoms/input";

const Amount = () => {
  return (
    <div className="mb-4">
      <p className="mb-1 text-light-white-500">Amount</p>
      <InputText
        type="number"
        placeholder="0.0"
        disable={false}
        required={true}
        onChange={() => {}}
        name="account"
        className={`w-full rounded-md`}
      />
    </div>
  );
};

export default Amount;
