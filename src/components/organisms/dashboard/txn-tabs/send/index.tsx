import React from "react";
import Recipient from "./recipient";
import Amount from "./amount";
import Submit from "./submit";
import Token from "./token";

const Send = () => {
  return (
    <div className="">
      <Recipient />
      <Amount />
      <Token />
      <Submit />
    </div>
  );
};

export default Send;
