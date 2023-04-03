import React from 'react';
import InputFieldNumber from "../../../components/InputFieldNumber";
import {setTxDelegateAmount} from "../../../store/actions/transactions/delegate";
import {useDispatch, useSelector} from "react-redux";
import {formatNumber, removeCommas, stringToNumber} from "../../../utils/scripts";
import NumberView from "../../../components/NumberView";
import {ValidateSendAmount, ValidateSpecialCharacters} from "../../../utils/validations";
import {useTranslation} from "react-i18next";
import {DefaultChainInfo} from "../../../config";

const Amount = () => {
    const {t} = useTranslation();
    const amount = useSelector((state) => state.delegate.amount);
    const transferableAmount = useSelector((state) => state.balance.amount);

    const dispatch = useDispatch();

    const onChange = (evt) => {
        let rex = /^\d*\.?\d{0,6}$/;
        if (rex.test(evt.target.value)) {
            dispatch(
                setTxDelegateAmount({
                    value: evt.target.value,
                    error: ValidateSendAmount(transferableAmount, (stringToNumber(evt.target.value)))
                })
            );
        } else {
            return false;
        }
    };

    const selectTotalBalanceHandler = (value) => {
        dispatch(
            setTxDelegateAmount({
                value: value,
                error: ValidateSendAmount(value, (stringToNumber(value)))
            })
        );
    };

    return (
        <div className="form-field p-0">
            <p className="label amount-label">
                <span> {t("DELEGATION_AMOUNT")}</span>
                <span
                    className={transferableAmount === 0 ? "empty info-data info-link" : "info-data info-link"}
                    onClick={() => selectTotalBalanceHandler(removeCommas(formatNumber(transferableAmount)))}><span
                        className="title">{t("BALANCE")}:</span>
                    <span
                        className="value">
                        <NumberView value={formatNumber(transferableAmount)}/>
                        {DefaultChainInfo.currency.coinDenom}
                    </span>
                </span>

            </p>
            <div className="amount-field">
                <InputFieldNumber
                    className="form-control"
                    min={0}
                    name="amount"
                    placeholder={t("DELEGATION_AMOUNT")}
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
