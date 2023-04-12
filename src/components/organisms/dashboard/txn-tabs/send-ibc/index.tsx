import React from "react";
import Recipient from "./recipient";
import Amount from "./amount";
import Submit from "./submit";
import Token from "./token";
import FeeOptions from "../../../common/fee";
import Chains from "./chains";

const SendIbc = () => {
  return (
    <div className="">
      <Chains />
      <Recipient />
      <Token />
      <Amount />
      <FeeOptions amount={"0"} />
      <Submit />
    </div>
  );
};

export default SendIbc;
