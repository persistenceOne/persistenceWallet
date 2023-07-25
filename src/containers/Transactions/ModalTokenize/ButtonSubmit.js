import React from "react";
import Button from "../../../components/Button";
import {
  hideTxTokenizeModal,
  setTxTokenizeShareStatus,
  submitFormData
} from "../../../store/actions/transactions/tokenizeShares";
import { useDispatch, useSelector } from "react-redux";
import { keplrSubmit } from "../../../store/actions/transactions/keplr";
import {
  TokenizeSharesMsg,
  TokenizeSharesTransferMsg,
  SendMsg
} from "../../../utils/protoMsgHelper";
import {
  closeLoader,
  setTxIno
} from "../../../store/actions/transactions/common";
import { LOGIN_INFO } from "../../../constants/localStorage";
import { stringToNumber, trimWhiteSpaces } from "../../../utils/scripts";
import { DefaultChainInfo } from "../../../config";
import transactions from "../../../utils/transactions";
import { fee } from "../../../utils/aminoMsgHelper";
import { fetchApiData, pollAccountBalance } from "../../../utils/queries";
import { fetchTokenizedSharesByAddress } from "../../../store/actions/tokenizeShares";
import Long from "long";
import { keyStoreTxn } from "../../../store/actions/transactions/keyStore";

const ButtonSubmit = () => {
  const dispatch = useDispatch();
  const loginInfo = JSON.parse(localStorage.getItem(LOGIN_INFO));
  const balance = useSelector((state) => state.balance.list);
  const amount = useSelector((state) => state.tokenizeShares.amount);
  const memo = useSelector((state) => state.tokenizeShares.memo);
  const validatorAddress = useSelector((state) => state.validators.validator);
  const toAddress = useSelector((state) => state.tokenizeShares.toAddress);
  const tokenizeShareTxStatus = useSelector(
    (state) => state.tokenizeShares.tokenizeShareTxStatus
  );
  const onClick = () => {
    dispatch(setTxTokenizeShareStatus("pending"));
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
    memo.error.message !== "" ||
    toAddress.value === "" ||
    tokenizeShareTxStatus === "pending";

  const onClickKeplr = async () => {
    dispatch(setTxTokenizeShareStatus("pending"));
    const msg = TokenizeSharesMsg(
      loginInfo && loginInfo.address,
      validatorAddress.value.operatorAddress,
      loginInfo.address,
      (amount.value * DefaultChainInfo.uTokenValue).toFixed(0),
      DefaultChainInfo.currency.coinMinimalDenom
    );

    try {
      const response = await transactions.TransactionWithKeplr(
        [msg],
        fee(0, 250000),
        ""
      );
      console.log("here", response);

      if (response.code !== undefined && response.code === 0) {
        const pollResult = await pollAccountBalance(
          balance,
          loginInfo && loginInfo.address
        );
        if (pollResult) {
          await fetchApiData(loginInfo && loginInfo.address, dispatch);
          dispatch(setTxTokenizeShareStatus("success"));
          const tokenizedList = await fetchTokenizedSharesByAddress(
            loginInfo && loginInfo.address
          );
          if (tokenizedList.length > 0) {
            console.log(tokenizedList, "tokenizedList");
            const searchResponse = tokenizedList.find(
              (item) =>
                item.validator === validatorAddress.value.operatorAddress
            );
            console.log(searchResponse, "searchResponse");
            if (searchResponse) {
              const msg1 = TokenizeSharesTransferMsg(
                searchResponse.id,
                loginInfo.address,
                toAddress.value
              );

              const msg2 = SendMsg(
                loginInfo && loginInfo.address,
                toAddress.value,
                (amount.value * DefaultChainInfo.uTokenValue).toFixed(0),
                DefaultChainInfo.currency.coinMinimalDenom
              );

              console.log(msg1, msg2, "msg2msg2");
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
              dispatch(keplrSubmit([msg1, msg2]));
            }
          }
        } else {
          throw Error("something went wrong");
        }
      } else {
        throw Error("something went wrong");
      }
    } catch (e) {
      dispatch(setTxTokenizeShareStatus(""));
    }
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

export default ButtonSubmit;
