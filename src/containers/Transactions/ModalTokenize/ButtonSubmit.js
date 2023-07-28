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
  SendMsg,
  ValidatorBond
} from "../../../utils/protoMsgHelper";
import {
  closeLoader,
  setTxIno,
  txFailed
} from "../../../store/actions/transactions/common";
import { LOGIN_INFO } from "../../../constants/localStorage";
import { stringToNumber, trimWhiteSpaces } from "../../../utils/scripts";
import { DefaultChainInfo } from "../../../config";
import transactions from "../../../utils/transactions";
import { fee } from "../../../utils/aminoMsgHelper";
import { fetchApiData, pollAccountBalance } from "../../../utils/queries";
import { getTokenizedShares } from "../../../utils/actions";

const getLatestRecord = (newList, oldList) => {
  const result = newList.filter(
    ({ recordId: recordId }) =>
      !oldList.some(
        ({ recordId: recordId2 }) =>
          recordId2.toNumber() === recordId.toNumber()
      )
  );
  return result;
};

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
  const tokenizeSharesInfo = useSelector((state) => state.tokenizeSharesInfo);

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
    toAddress.error.message !== "" ||
    tokenizeShareTxStatus === "pending";

  const onClickKeplr = async () => {
    dispatch(setTxTokenizeShareStatus("pending"));
    dispatch(txFailed(""));
    // const msg = ValidatorBond(
    //   loginInfo && loginInfo.address,
    //   validatorAddress.value.operatorAddress
    // );

    const msg = TokenizeSharesMsg(
      loginInfo && loginInfo.address,
      validatorAddress.value.operatorAddress,
      loginInfo.address,
      (amount.value * DefaultChainInfo.uTokenValue).toFixed(0),
      DefaultChainInfo.currency.coinMinimalDenom
    );

    try {
      console.log("msg", msg);
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
          const list = await getTokenizedShares(loginInfo && loginInfo.address);

          console.log(list, tokenizeSharesInfo, "tokenizeSharesInfo");
          let listItem;
          if (list.length > 0) {
            const tokenizeShareResponse = list.find(
              (share) =>
                validatorAddress.value.operatorAddress ===
                share.validatorAddress
            );
            if (tokenizeShareResponse) {
              listItem = tokenizeShareResponse.list;
            }
          }
          let shareInfo;
          if (tokenizeSharesInfo.sharesList.length > 0) {
            const tokenizeShareResponse1 = tokenizeSharesInfo.sharesList.find(
              (share) =>
                validatorAddress.value.operatorAddress ===
                share.validatorAddress
            );
            if (tokenizeShareResponse1) {
              shareInfo = tokenizeShareResponse1.list;
            }
          }
          console.log(listItem, "shareInfo", shareInfo);
          let tokenizedItem;
          if (!shareInfo && listItem) {
            tokenizedItem = listItem;
          } else {
            tokenizedItem = getLatestRecord(
              listItem,
              shareInfo,
              validatorAddress.value.operatorAddress
            );
          }
          console.log(tokenizedItem, "uniqList");
          if (tokenizedItem) {
            const msg1 = TokenizeSharesTransferMsg(
              tokenizedItem[0].recordId,
              loginInfo.address,
              toAddress.value
            );
            const msg2 = SendMsg(
              loginInfo && loginInfo.address,
              toAddress.value,
              (amount.value * DefaultChainInfo.uTokenValue).toFixed(0),
              tokenizedItem[0].denom
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
            dispatch(setTxTokenizeShareStatus("success"));
            dispatch(keplrSubmit([msg1, msg2]));
          }
        } else {
          throw Error("something went wrong");
        }
      } else {
        throw Error(response.rawLog);
      }
    } catch (e) {
      dispatch(txFailed(e.message));
      console.log(e, "error");
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
