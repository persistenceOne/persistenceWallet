import React, { useEffect, useState } from "react";
import Button from "../../../../../components/Button";
import { submitFormData } from "../../../../../store/actions/transactions/send";
import { useDispatch, useSelector } from "react-redux";
import { keplrSubmit } from "../../../../../store/actions/transactions/keplr";
import { setTxName } from "../../../../../store/actions/transactions/common";
import { LOGIN_INFO } from "../../../../../constants/localStorage";
import { MsgSend } from "cosmjs-types/cosmos/bank/v1beta1/tx";
import { trimWhiteSpaces } from "../../../../../utils/scripts";
import { handleDelegationTransferModal } from "../../../../../store/actions/transactions/delegationTransfer";
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

const ButtonSend = () => {
  const dispatch = useDispatch();
  const [tokenizedShares, setTokenizedShares] = useState([]);
  const loginInfo = JSON.parse(localStorage.getItem(LOGIN_INFO));
  const toAddress = useSelector((state) => state.delegationTransfer.toAddress);
  const balance = useSelector((state) => state.balance.list);

  useEffect(() => {
    console.log(balance, "balance");
    if (balance.length > 0) {
      const tokenizedList = balance.filter((item) =>
        item.denom.startsWith("persistence")
      );
      console.log(tokenizedList, "tokenizedList");
      if (tokenizedList) {
        setTokenizedShares(tokenizedList);
      }
    }
  }, [balance]);

  const onClick = () => {
    const msg = SendMsg(
      loginInfo && loginInfo.address,
      toAddress.value,
      tokenizedShares
    );
    console.log(msg, "msg", toAddress);
    dispatch(handleDelegationTransferModal(false));
    dispatch(submitFormData([msg]));
  };

  const disable = tokenizedShares.length <= 0;

  const onClickKeplr = () => {
    let balance = [];
    tokenizedShares.forEach((item) => {
      balance.push(item);
    });
    const msg = SendMsg(
      loginInfo && loginInfo.address,
      toAddress.value,
      balance
    );
    dispatch(
      setTxName({
        value: {
          name: "send"
        }
      })
    );
    dispatch(handleDelegationTransferModal(false));
    dispatch(keplrSubmit([msg]));
  };

  return (
    <div className="buttons">
      <div className="button-section">
        <Button
          className="button button-primary"
          type="button"
          disable={disable}
          value="Send"
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
