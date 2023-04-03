import React from 'react';
import InputFieldNumber from "../../../components/InputFieldNumber";
import {useDispatch, useSelector} from "react-redux";
import {formatNumber, removeCommas, stringToNumber} from "../../../utils/scripts";
import NumberView from "../../../components/NumberView";
import {ValidateReDelegateAmount, ValidateSpecialCharacters} from "../../../utils/validations";
import {useTranslation} from "react-i18next";
import {setTxUnbondAmount} from "../../../store/actions/transactions/unbond";
import {DefaultChainInfo} from "../../../config";

const Amount = () => {
    const {t} = useTranslation();
    const amount = useSelector((state) => state.unbondTx.amount);
    const validatorDelegationAmount = useSelector((state) => state.validators.validatorDelegations);
    const dispatch = useDispatch();

    const onChange = (evt) => {
        let rex = /^\d*\.?\d{0,6}$/;
        if (rex.test(evt.target.value)) {
            dispatch(
                setTxUnbondAmount({
                    value: evt.target.value,
                    error: ValidateReDelegateAmount(validatorDelegationAmount.value, (stringToNumber(evt.target.value)))
                })
            );
        } else {
            return false;
        }
    };

    const selectTotalBalanceHandler = (value) => {
        dispatch(
            setTxUnbondAmount({
                value: value,
                error: ValidateReDelegateAmount(value, (stringToNumber(value)))
            })
        );
    };

    return (
        <div className="form-field p-0">
            <p className="label amount-label">
                <span> {t("UNBOND_AMOUNT")}</span>
                <span
                    className={validatorDelegationAmount.value === 0 ? "empty info-data info-link" : "info-data info-link"}
                    onClick={() => selectTotalBalanceHandler(removeCommas(formatNumber(validatorDelegationAmount.value)))}><span
                        className="title">{t("DELEGATED_AMOUNT")}:</span> <span
                        className="value">
                        <NumberView
                            value={formatNumber(validatorDelegationAmount.value)}/> {DefaultChainInfo.currency.coinDenom}</span> </span>

            </p>
            <div className="amount-field">
                <InputFieldNumber
                    className="form-control"
                    min={0}
                    name="amount"
                    placeholder={t("UNBOND_AMOUNT")}
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
