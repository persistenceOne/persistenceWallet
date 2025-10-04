import React from "react";
import Button from "../../../components/Button";
import {
  hideTxCancelUnbondModal,
  submitFormData
} from "../../../store/actions/transactions/cancel-unbond";
import { useDispatch, useSelector } from "react-redux";
import { keplrSubmit } from "../../../store/actions/transactions/keplr";
import { CancelUnbondingMsg } from "../../../utils/protoMsgHelper";
import { setTxIno } from "../../../store/actions/transactions/common";
import { LOGIN_INFO } from "../../../constants/localStorage";

const ButtonSubmit = ({ entry, validatorAddress, type, list }) => {
  const dispatch = useDispatch();
  const loginInfo = JSON.parse(localStorage.getItem(LOGIN_INFO));
  const amount = useSelector((state) => state.cancelUnbondTx.amount);
  const memo = useSelector((state) => state.cancelUnbondTx.memo);

  const onClick = () => {
    let msgs = [];
    if (type === "individual") {
      msgs.push(
        CancelUnbondingMsg(
          loginInfo && loginInfo.address,
          validatorAddress,
          entry.balance,
          entry.creationHeight
        )
      );
    } else {
      list.map((item) => {
        item.entries.length > 0
          ? item.entries.map((ItemEntry) => {
              msgs.push(
                CancelUnbondingMsg(
                  loginInfo && loginInfo.address,
                  item.validatorAddress,
                  ItemEntry.balance,
                  ItemEntry.creationHeight
                )
              );
            })
          : null;
      });
    }
    dispatch(submitFormData(msgs));
  };

  const disable = memo.error.message !== "";

  const onClickKeplr = () => {
    let msgs = [];
    if (type === "individual") {
      msgs.push(
        CancelUnbondingMsg(
          loginInfo && loginInfo.address,
          validatorAddress,
          entry.balance,
          entry.creationHeight
        )
      );
    } else {
      list.map((item) => {
        item.entries.length > 0
          ? item.entries.map((ItemEntry, entryIndex) => {
              msgs.push(
                CancelUnbondingMsg(
                  loginInfo && loginInfo.address,
                  item.validatorAddress,
                  ItemEntry.balance,
                  ItemEntry.creationHeight
                )
              );
            })
          : null;
      });
    }
    console.log(msgs, "msgs-txns");
    dispatch(
      setTxIno({
        value: {
          modal: hideTxCancelUnbondModal(),
          data: {
            message: "",
            memo: ""
          }
        }
      })
    );
    dispatch(keplrSubmit(msgs));
  };

  return (
    <div className="buttons">
      <div className="button-section">
        <Button
          className="button button-primary"
          type="button"
          disable={disable}
          value={type === "individual" ? "Cancel Unbonding" : "Cancel All"}
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

export default ButtonSubmit;
