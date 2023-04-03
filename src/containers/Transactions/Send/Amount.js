import React from 'react';
import InputFieldNumber from "../../../components/InputFieldNumber";
import {setTxSendAmount} from "../../../store/actions/transactions/send";
import {useDispatch, useSelector} from "react-redux";
import {formatNumber, removeCommas, stringToNumber} from "../../../utils/scripts";
import NumberView from "../../../components/NumberView";
import {ValidateSendAmount, ValidateSpecialCharacters} from "../../../utils/validations";
import {useTranslation} from "react-i18next";
import helper from "../../../utils/helper";
import {DefaultChainInfo, PstakeInfo, stkATOMInfo} from "../../../config";

const Amount = () => {
    const {t} = useTranslation();
    const amount = useSelector((state) => state.send.amount);
    const token = useSelector((state) => state.send.token.value);
    const transferableAmount = useSelector((state) => state.balance.transferableAmount);
    const dispatch = useDispatch();

    const onChange = (evt) => {
        let rex = /^\d*\.?\d{0,6}$/;
        if (rex.test(evt.target.value)) {
            if (token.tokenDenom === DefaultChainInfo.currency.coinMinimalDenom) {
                dispatch(setTxSendAmount({
                    value: evt.target.value,
                    error: ValidateSendAmount(transferableAmount, (stringToNumber(evt.target.value)))
                }));

            } else {
                dispatch(
                    setTxSendAmount({
                        value: evt.target.value,
                        error: ValidateSendAmount(token.transferableAmount, (stringToNumber(evt.target.value)))
                    })
                );
            }
        } else {
            return false;
        }
    };

    const selectTotalBalanceHandler = (value) => {
        dispatch(
            setTxSendAmount({
                value: value,
                error: ValidateSendAmount(value, (stringToNumber(value)))
            })
        );
    };

    console.log("toke11231n", token);

    return (
        <div className="form-field p-0">
            <p className="label amount-label">
                <span> {t("AMOUNT")}</span>
                {
                    Object.keys(token).length !== 0 ?
                        token.tokenDenom === DefaultChainInfo.currency.coinMinimalDenom || token.tokenDenom === stkATOMInfo.coinMinimalDenom ?
                            token.tokenDenom === DefaultChainInfo.currency.coinMinimalDenom ?
                                <span
                                    className={transferableAmount === 0 ? "empty info-data" : "info-data info-link"}
                                    onClick={() => selectTotalBalanceHandler(transferableAmount)}><span
                                        className="title">{t("TRANSFERABLE_BALANCE")}:</span>
                                    <span
                                        className="value"
                                        title={transferableAmount}>
                                        <NumberView value={formatNumber(transferableAmount)}/>
                                        {DefaultChainInfo.currency.coinDenom}
                                    </span>
                                </span>
                                : 
                                <span
                                    className={transferableAmount === 0 ? "empty info-data" : "info-data info-link"}
                                    onClick={() => selectTotalBalanceHandler(token.transferableAmount)}><span
                                        className="title">{t("TRANSFERABLE_BALANCE")}:</span>
                                    <span
                                        className="value"
                                        title={transferableAmount}>
                                        <NumberView value={formatNumber(token.transferableAmount)}/>
                                        &nbsp;{helper.denomChange(token.tokenDenom)}
                                    </span>
                                </span>
                            :
                            (token.tokenDenom === PstakeInfo.coinMinimalDenom) ?
                                <span className={token.transferableAmount === 0 ? "empty info-data" : "info-data info-link"}
                                    onClick={() => selectTotalBalanceHandler(token.transferableAmount)}>
                                    <span
                                        className="title">{t("TRANSFERABLE_BALANCE")}:</span>
                                    <span
                                        className="value">
                                        <NumberView value={formatNumber(token.transferableAmount)}/>
                                        &nbsp;{helper.denomChange(token.tokenItem.denomTrace.baseDenom)}
                                    </span>
                                </span>
                                :
                                <span title={token.tokenDenom}
                                    className={token.transferableAmount === 0 ? "empty info-data" : "info-data"}>
                                    <span
                                        className="title">{t("TRANSFERABLE_BALANCE")}:</span>
                                    <span
                                        className="value">{token.transferableAmount.toLocaleString()}
                                        {helper.denomChange(token.tokenItem.denomTrace.baseDenom)}
                                        ( IBC Trace path - {token.tokenItem.denomTrace.path} ,
                                        denom: {token.tokenItem.denomTrace.baseDenom}, {token.tokenDenom})
                                    </span>
                                </span>
                        :
                        <span
                            className={transferableAmount === 0 ? "empty info-data" : "info-data info-link"}
                            onClick={() => selectTotalBalanceHandler(removeCommas(formatNumber(transferableAmount)))}><span
                                className="title">{t("TRANSFERABLE_BALANCE")}:</span>
                            <span
                                className="value"
                                title={transferableAmount}>
                                <NumberView value={formatNumber(transferableAmount)}/>
                                {DefaultChainInfo.currency.coinDenom}
                            </span> 
                        </span>
                }
            </p>
            <div className="amount-field">
                <InputFieldNumber
                    className="form-control"
                    min={0}
                    name="Amount"
                    placeholder="Enter Amount"
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
