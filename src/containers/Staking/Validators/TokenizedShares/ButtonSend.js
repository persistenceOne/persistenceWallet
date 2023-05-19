import React, { useEffect, useState } from "react";
import Button from "../../../../components/Button";
import { submitFormData } from "../../../../store/actions/transactions/redeemShares";
import { useDispatch, useSelector } from "react-redux";
import { keplrSubmit } from "../../../../store/actions/transactions/keplr";
import { setTxName } from "../../../../store/actions/transactions/common";
import { LOGIN_INFO } from "../../../../constants/localStorage";
import { RedeemDelegationTransferMsg } from "../../../../utils/protoMsgHelper";

const ButtonSend = ({ tokenizedShares }) => {
  const dispatch = useDispatch();
  const loginInfo = JSON.parse(localStorage.getItem(LOGIN_INFO));

  const onClick = () => {
    let messages = [];
    tokenizedShares.forEach((item) => {
      const msg = RedeemDelegationTransferMsg(
        loginInfo && loginInfo.address,
        item.denom,
        item.amount
      );
      messages.push(msg);
    });

    dispatch(submitFormData(messages));
  };

  const disable = tokenizedShares.length <= 0;

  const onClickKeplr = () => {
    let messages = [];
    tokenizedShares.forEach((item) => {
      const msg = RedeemDelegationTransferMsg(
        loginInfo && loginInfo.address,
        item.denom,
        item.amount
      );
      messages.push(msg);
    });

    dispatch(
      setTxName({
        value: {
          name: "redeem-shares"
        }
      })
    );
    dispatch(keplrSubmit(messages));
  };

  return (
    <div className="buttons">
      <div className="button-section">
        <Button
          className="button button-primary"
          type="button"
          disable={disable}
          value="Redeem Shares"
          onClick={
            loginInfo && loginInfo.loginMode === "keplr"
              ? onClickKeplr
              : onClick
          }
        />
      </div>
    </div>
  );
};

export default ButtonSend;
