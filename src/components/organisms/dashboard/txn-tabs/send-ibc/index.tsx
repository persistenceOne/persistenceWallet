import React from "react";
import Recipient from "./recipient";
import Amount from "./amount";
import Submit from "./submit";
import Token from "./token";
import FeeOptions from "../../../common/fee";
import Chains from "./chains";
import Memo from "../../../common/memo";

const SendIbc = () => {
  return (
    <div className="">
      <Chains />
      <Recipient />
      <Token />
      <Amount />
      <Memo />
      <FeeOptions amount={"0"} />
      <Submit />
    </div>
  );
};

export default SendIbc;
