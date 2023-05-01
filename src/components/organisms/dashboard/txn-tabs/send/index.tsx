import React from "react";
import Recipient from "./recipient";
import Amount from "./amount";
import Submit from "./submit";
import Token from "./token";
import FeeOptions from "../../../common/fee";
import Memo from "../../../common/memo";

const Send = () => {
  return (
    <div className="">
      <Recipient />
      <Token />
      <Amount />
      <Memo />
      <FeeOptions amount={"0"} />
      <Submit />
    </div>
  );
};

export default Send;
