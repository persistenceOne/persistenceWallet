import React from "react";
import Button from "../../../../../components/Button";
import { useSelector, useDispatch } from "react-redux";
import { LOGIN_INFO } from "../../../../../constants/localStorage";
import { submitFormData } from "../../../../../store/actions/transactions/delegationTransfer";

const Submit = () => {
  const dispatch = useDispatch();
  const loginInfo = JSON.parse(localStorage.getItem(LOGIN_INFO));
  const toAddress = useSelector((state) => state.delegationTransfer.toAddress);
  // const list = useSelector((state) => state.delegationTransfer.list);
  const memo = useSelector((state) => state.delegationTransfer.memo);

  // let sendAmount;
  // if (token.value.tokenDenom === PstakeInfo.coinMinimalDenom) {
  //   sendAmount = unDecimalize(amount.value.toString()).toString();
  // } else {
  //   sendAmount = (amount.value * 1000000).toFixed(0);
  // }

  const onClick = () => {
    dispatch(submitFormData([]));
  };

  const disable =
    toAddress.value === "" ||
    toAddress.error.message !== "" ||
    memo.error.message !== "";

  const onClickKeplr = () => {
    // dispatch(
    //   setTxName({
    //     value: {
    //       name: "send"
    //     }
    //   })
    // );
    // dispatch(
    //   keplrSubmit([
    //     SendMsg(
    //       loginInfo && loginInfo.address,
    //       toAddress.value,
    //       sendAmount,
    //       token.value.token
    //     )
    //   ])
    // );
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
