import React from "react";
import Button from "../../../../../components/Button";
import { useSelector, useDispatch } from "react-redux";
import { LOGIN_INFO } from "../../../../../constants/localStorage";
import {
  handleDelegationTokenizeModal,
  submitFormData
} from "../../../../../store/actions/transactions/delegationTransfer";
import {
  TokenizeSharesMsg,
  TokenizeSharesTransferMsg
} from "../../../../../utils/protoMsgHelper";
import {
  setTxIno,
  setTxName
} from "../../../../../store/actions/transactions/common";
import { keplrSubmit } from "../../../../../store/actions/transactions/keplr";
import Long from "long";

const Submit = () => {
  const dispatch = useDispatch();
  const loginInfo = JSON.parse(localStorage.getItem(LOGIN_INFO));
  const toAddress = useSelector((state) => state.delegationTransfer.toAddress);
  const list = useSelector((state) => state.delegationTransfer.list);
  const memo = useSelector((state) => state.delegationTransfer.memo);

  const onClick = () => {
    let messages = [];
    const msg1 = TokenizeSharesMsg(
      loginInfo.address,
      "persistencevaloper1ntmnu2aqtxwms06nvv2m80hm5dxvtyeslxugwl",
      "persistence1nwzwh7vzxxhm2xheq2zadue2d6ru6ascp4hq76",
      (0.01 * 1000000).toFixed(0)
    );

    const msg2 = TokenizeSharesTransferMsg(
      Long.fromNumber(54),
      loginInfo.address,
      "persistence1nwzwh7vzxxhm2xheq2zadue2d6ru6ascp4hq76"
    );

    messages = [msg2, msg1];

    dispatch(handleDelegationTokenizeModal(false));
    dispatch(submitFormData(messages));
  };

  const disable =
    toAddress.value === "" ||
    toAddress.error.message !== "" ||
    memo.error.message !== "";

  const onClickKeplr = () => {
    let messages = [];
    list.forEach(async (item) => {
      messages.push(
        TokenizeSharesMsg(
          loginInfo.address,
          item.address,
          toAddress.value,
          (item.inputAmount * 1000000).toFixed(0)
        )
      );
    });
    dispatch(
      setTxIno({
        value: {
          modal: handleDelegationTokenizeModal(false),
          data: {
            message: "",
            amount: "",
            list: [],
            memo: ""
          }
        }
      })
    );
    dispatch(
      setTxName({
        value: {
          name: "delegation-transfer"
        }
      })
    );
    dispatch(handleDelegationTokenizeModal(false));
    dispatch(keplrSubmit(messages));
  };

  return (
    <div className="buttons">
      <div className="button-section">
        <Button
          className="button button-primary"
          type="button"
          disable={disable}
          value="Transfer"
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

export default Submit;
