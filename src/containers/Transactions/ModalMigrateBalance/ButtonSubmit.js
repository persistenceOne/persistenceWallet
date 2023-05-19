import React from "react";
import Button from "../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { trimWhiteSpaces, unDecimalize } from "../../../utils/scripts";
import { LOGIN_INFO } from "../../../constants/localStorage";
import { MsgSend } from "cosmjs-types/cosmos/bank/v1beta1/tx";
import {
  setTxSendAmount,
  submitFormData
} from "../../../store/actions/transactions/migrateAssets";
import { DefaultChainInfo, PstakeInfo } from "../../../config";
import { DelegationTransferMsg } from "../../../utils/protoMsgHelper";
const msgSendTypeUrl = "/cosmos.bank.v1beta1.MsgSend";

const SendMsg = (fromAddress, toAddress, amount) => {
  return {
    typeUrl: msgSendTypeUrl,
    value: MsgSend.fromPartial({
      fromAddress: trimWhiteSpaces(fromAddress),
      toAddress: trimWhiteSpaces(toAddress),
      amount: amount
    })
  };
};

const ButtonMigrate = ({ selectedList }) => {
  const dispatch = useDispatch();
  const { migrationTokenList, buttonStatus, toAddress } = useSelector(
    (state) => state.migrateAssets
  );
  const loginInfo = JSON.parse(localStorage.getItem(LOGIN_INFO));

  const onClick = () => {
    let messages = [];

    let balance = [];
    migrationTokenList.list.forEach((item) => {
      let denom;
      if (item.denom === DefaultChainInfo.currency.coinMinimalDenom) {
        dispatch(
          setTxSendAmount({
            value: item.amount,
            error: ""
          })
        );
      }
      let sendAmount;
      if (item.denom === PstakeInfo.coinMinimalDenom) {
        sendAmount = unDecimalize(item.amount.toString()).toString();
      } else {
        sendAmount = (item.amount * 1000000).toFixed(0);
      }
      denom = item.denom;
      balance.push({
        denom: denom,
        amount: sendAmount
      });
    });
    const msg = SendMsg(
      loginInfo && loginInfo.address,
      toAddress.value,
      balance
    );
    console.log(msg);
    messages.push(msg);
    if (selectedList.list.length > 0) {
      selectedList.list.forEach(async (item) => {
        messages.push(
          DelegationTransferMsg(
            loginInfo.address,
            item.address,
            toAddress.value,
            (item.amount * 1000000).toFixed(0)
          )
        );
      });
    }

    dispatch(submitFormData(messages));
  };

  const disable = buttonStatus.includes(true);
  return (
    <div className="buttons">
      <div className="button-section">
        <Button
          className="button button-primary"
          type="button"
          disable={disable}
          value="Migrate"
          onClick={onClick}
        />
      </div>
    </div>
  );
};

export default ButtonMigrate;
