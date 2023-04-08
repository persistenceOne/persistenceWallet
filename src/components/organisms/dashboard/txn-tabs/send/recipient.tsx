import React from "react";
import InputText from "../../../../atoms/input";

const Recipient = () => {
  return (
    <div className="">
      <div className="mb-4">
        <p className="mb-1 text-light-white-500">Recipient</p>
        <InputText
          type="text"
          placeholder="recipient"
          disable={false}
          required={true}
          onChange={() => {}}
          name="recipient"
          className={`w-full rounded-md`}
        />
      </div>
    </div>
  );
};

export default Recipient;
