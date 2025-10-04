import React from "react";
import InputFieldNumber from "../../../components/InputFieldNumber";
import { setTxTokenizeAmount } from "../../../store/actions/transactions/tokenizeShares";
import { useDispatch, useSelector } from "react-redux";
import {
  formatNumber,
  removeCommas,
  stringToNumber,
  unDecimalize
} from "../../../utils/scripts";
import NumberView from "../../../components/NumberView";
import {
  ValidateReDelegateAmount,
  ValidateSendAmount,
  ValidateSpecialCharacters
} from "../../../utils/validations";
import { useTranslation } from "react-i18next";
import { DefaultChainInfo } from "../../../config";

const Amount = () => {
  const { t } = useTranslation();
  const amount = useSelector((state) => state.tokenizeShares.amount);
  const validatorDelegationAmount = useSelector(
    (state) => state.validators.validatorDelegations
  );

  const tokenizeShareTxParams = useSelector(
    (state) => state.tokenizeShares.tokenizeShareTxParams
  );

  const dispatch = useDispatch();

  const bondCheck = (value) => {
    const decValue = Number(unDecimalize(value, 6));
    const tokenConversion =
      decValue *
      (tokenizeShareTxParams.validatorTokens /
        tokenizeShareTxParams.delegatorShares);

    const check1 =
      tokenizeShareTxParams.valBondShares *
        tokenizeShareTxParams.valBondFactor >
      tokenizeShareTxParams.liquidShares + tokenConversion;

    const check2 =
      tokenizeShareTxParams.validatorLiquidStakingCap *
        tokenizeShareTxParams.delegatorShares >
      tokenizeShareTxParams.liquidShares + tokenConversion;

    if (!check1 || !check2) {
      return new Error("Insufficient Validator Bonds");
    } else {
      return new Error("");
    }
  };

  const inputHandler = (value) => {
    let rex = /^\d*\.?\d{0,6}$/;
    if (rex.test(value)) {
      const amountValidation = ValidateReDelegateAmount(
        validatorDelegationAmount.value,
        stringToNumber(value)
      );
      // const bondValidation = bondCheck(value);
      // let validationCheck;
      // if (bondValidation.message !== "") {
      //   validationCheck = bondValidation;
      // } else {
      //   validationCheck = amountValidation;

      dispatch(
        setTxTokenizeAmount({
          value: value,
          error: amountValidation
        })
      );
    } else {
      return false;
    }
  };

  const onChange = (evt) => {
    let rex = /^\d*\.?\d{0,6}$/;
    if (rex.test(evt.target.value)) {
      inputHandler(evt.target.value);
    } else {
      return false;
    }
  };

  const selectTotalBalanceHandler = (value) => {
    inputHandler(value);
  };

  return (
    <div className="form-field p-0">
      <p className="label amount-label">
        <span>Amount to Transfer</span>
        <span
          className={
            validatorDelegationAmount.value === 0
              ? "empty info-data info-link"
              : "info-data info-link"
          }
          onClick={() =>
            selectTotalBalanceHandler(
              removeCommas(formatNumber(validatorDelegationAmount.value))
            )
          }
        >
          <span className="title">{t("DELEGATED_AMOUNT")}:</span>{" "}
          <span className="value">
            <NumberView value={formatNumber(validatorDelegationAmount.value)} />{" "}
            {DefaultChainInfo.currency.coinDenom}
          </span>{" "}
        </span>
      </p>
      <div className="amount-field">
        <InputFieldNumber
          className="form-control"
          min={0}
          name="amount"
          placeholder={"Amount"}
          required={true}
          type="number"
          value={amount.value}
          onKeyPress={ValidateSpecialCharacters}
          error={amount.error}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default Amount;
