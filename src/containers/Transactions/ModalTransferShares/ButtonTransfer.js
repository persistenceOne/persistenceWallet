import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import { submitFormData } from "../../../store/actions/transactions/delegationTransfer";
import { useDispatch, useSelector } from "react-redux";
import { keplrSubmit } from "../../../store/actions/transactions/keplr";
import {
  setTxIno,
  setTxName
} from "../../../store/actions/transactions/common";
import { LOGIN_INFO } from "../../../constants/localStorage";
import {
  msgSendTypeUrl,
  RedeemTokenizedSharesMsg,
  TokenizedSharesRewardsMsg,
  TokenizeSharesTransferMsg
} from "../../../utils/protoMsgHelper";
import { DefaultChainInfo } from "../../../config";
import { MsgSend } from "cosmjs-types/cosmos/bank/v1beta1/tx";
import { trimWhiteSpaces } from "../../../utils/scripts";
import { handleDelegationTransferModal } from "../../../store/actions/transactions/delegationTransfer";

function SendMsg(fromAddress, toAddress, balance) {
  return {
    typeUrl: msgSendTypeUrl,
    value: MsgSend.fromPartial({
      fromAddress: trimWhiteSpaces(fromAddress),
      toAddress: trimWhiteSpaces(toAddress),
      amount: balance
    })
  };
}

const ButtonTransfer = ({ tokenizedShares, rewardList }) => {
  const dispatch = useDispatch();
  const loginInfo = JSON.parse(localStorage.getItem(LOGIN_INFO));
  const toAddress = useSelector((state) => state.delegationTransfer.toAddress);

  const onClick = () => {
    const messages = getMessage();
    console.log(messages, "messages-transfer")
    dispatch(submitFormData(messages));
  };

  const disable = tokenizedShares.length <= 0 || toAddress.value === "";

  const getMessage = () => {
    let messages = [];
    // const ledgerApp = localStorage.getItem("ledgerAppName");
    // if(loginInfo && loginInfo.loginMode === "keplr" || ledgerApp !== "Persistence"){
      rewardList.forEach((item) => {
        const msg = TokenizedSharesRewardsMsg(item.owner,item.recordId);
        messages.push(msg);
      });
      let blcList = [];
      tokenizedShares.forEach((item) => {
        const blc = {
          amount: (item.amount * DefaultChainInfo.uTokenValue).toFixed(0),
          denom: item.denom
        };
        blcList.push(blc);
        const msg = TokenizeSharesTransferMsg(
          item.recordId,
          loginInfo.address,
          toAddress.value
        );
        messages.push(msg);
      });
      const sendMsg = SendMsg(
        loginInfo && loginInfo.address,
        toAddress.value,
        blcList
      );
      messages.push(sendMsg);
      return messages;
    // } else {
    //   let blcList = [];
    //   tokenizedShares.forEach((item) => {
    //     const blc = {
    //       amount: (item.amount * DefaultChainInfo.uTokenValue).toFixed(0),
    //       denom: item.denom
    //     };
    //     blcList.push(blc);
    //   });
    //   const sendMsg = SendMsg(
    //     loginInfo && loginInfo.address,
    //     toAddress.value,
    //     blcList
    //   );
    //   messages.push(sendMsg);
    //   return messages;
    // }
  };

  const onClickKeplr = () => {
    const messages = getMessage();
    dispatch(
      setTxIno({
        value: {
          modal: handleDelegationTransferModal(false),
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
          name: "transfer-shares"
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
          value="Transfer Shares"
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

export default ButtonTransfer;
