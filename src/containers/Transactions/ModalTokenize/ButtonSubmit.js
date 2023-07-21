import React from "react";
import Button from "../../../components/Button";
import {
  hideTxTokenizeModal,
  submitFormData
} from "../../../store/actions/transactions/tokenizeShares";
import { useDispatch, useSelector } from "react-redux";
import { keplrSubmit } from "../../../store/actions/transactions/keplr";
import { TokenizeSharesMsg } from "../../../utils/protoMsgHelper";
import { setTxIno } from "../../../store/actions/transactions/common";
import { LOGIN_INFO } from "../../../constants/localStorage";
import { stringToNumber } from "../../../utils/scripts";
import { DefaultChainInfo } from "../../../config";

const ButtonSubmit = () => {
  const dispatch = useDispatch();
  const loginInfo = JSON.parse(localStorage.getItem(LOGIN_INFO));
  const amount = useSelector((state) => state.tokenizeShares.amount);
  const memo = useSelector((state) => state.tokenizeShares.memo);
  const validatorAddress = useSelector((state) => state.validators.validator);

  const onClick = () => {
    dispatch(
      submitFormData([
        TokenizeSharesMsg(
          loginInfo && loginInfo.address,
          validatorAddress.value.operatorAddress,
          loginInfo.address,
          (amount.value * DefaultChainInfo.uTokenValue).toFixed(0),
          DefaultChainInfo.currency.coinMinimalDenom
        )
      ])
    );
  };

  const disable =
    amount.value === "" ||
    stringToNumber(amount.value) === 0 ||
    amount.error.message !== "" ||
    validatorAddress.value === "" ||
    validatorAddress.error.message !== "" ||
    memo.error.message !== "";

  const onClickKeplr = () => {
    dispatch(
      setTxIno({
        value: {
          modal: hideTxTokenizeModal(),
          data: {
            message: "",
            memo: ""
          }
        }
      })
    );
    dispatch(
      keplrSubmit([
        TokenizeSharesMsg(
          loginInfo && loginInfo.address,
          validatorAddress.value.operatorAddress,
          loginInfo.address,
          (amount.value * DefaultChainInfo.uTokenValue).toFixed(0),
          DefaultChainInfo.currency.coinMinimalDenom
        )
      ])
    );
  };

  return (
    <div className="buttons">
      <div className="button-section">
        <Button
          className="button button-primary"
          type="button"
          disable={disable}
          value="Submit"
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
