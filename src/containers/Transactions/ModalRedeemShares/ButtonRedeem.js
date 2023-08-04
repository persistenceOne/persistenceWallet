import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import {
  hideTxRedeemSharesModal,
  submitFormData
} from "../../../store/actions/transactions/redeemShares";
import { useDispatch, useSelector } from "react-redux";
import { keplrSubmit } from "../../../store/actions/transactions/keplr";
import {
  setTxIno,
  setTxName
} from "../../../store/actions/transactions/common";
import { LOGIN_INFO } from "../../../constants/localStorage";
import {
  RedeemTokenizedSharesMsg,
  TokenizedSharesRewardsMsg
} from "../../../utils/protoMsgHelper";
import { DefaultChainInfo } from "../../../config";

const ButtonRedeem = ({ tokenizedShares, rewardList }) => {
  console.log(tokenizedShares, "tokenizedShares123", rewardList);
  const dispatch = useDispatch();
  const loginInfo = JSON.parse(localStorage.getItem(LOGIN_INFO));

  const onClick = () => {
    let messages = [];
    rewardList.forEach((item) => {
      const msg = TokenizedSharesRewardsMsg(item.owner, item.recordId);
      messages.push(msg);
    });
    tokenizedShares.forEach((item) => {
      const msg = RedeemTokenizedSharesMsg(
        loginInfo && loginInfo.address,
        item.denom,
        (item.amount * DefaultChainInfo.uTokenValue).toFixed(0)
      );
      messages.push(msg);
    });
    console.log(messages, "messages");
    dispatch(submitFormData(messages));
  };

  const disable = tokenizedShares.length <= 0;

  const onClickKeplr = () => {
    let messages = [];
    console.log(rewardList, "rewardList1");
    rewardList.forEach((item) => {
      const msg = TokenizedSharesRewardsMsg(item.owner, item.recordId);
      console.log(msg, "msg1234");
      messages.push(msg);
    });
    tokenizedShares.forEach((item) => {
      const msg = RedeemTokenizedSharesMsg(
        loginInfo && loginInfo.address,
        item.denom,
        (item.amount * DefaultChainInfo.uTokenValue).toFixed(0)
      );
      messages.push(msg);
    });
    dispatch(
      setTxIno({
        value: {
          modal: hideTxRedeemSharesModal(),
          data: {
            message: "",
            memo: ""
          }
        }
      })
    );
    dispatch(
      setTxName({
        value: {
          name: "redeem-shares"
        }
      })
    );
    console.log(messages, "messages1");
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

export default ButtonRedeem;
