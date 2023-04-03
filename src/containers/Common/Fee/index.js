import React, {useEffect} from 'react';
import NumberView from "../../../components/NumberView";
import {formatNumber} from "../../../utils/scripts";
import {useDispatch, useSelector} from "react-redux";
import {feeChangeHandler} from "../../../store/actions/transactions/fee";
import {ValidateFee} from "../../../utils/validations";
import {tokenValueConversion} from "../../../utils/helper";
import {DefaultChainInfo, FeeInfo} from "../../../config";

const Fee = () => {
    const dispatch = useDispatch();
    const transferableAmount = useSelector((state) => state.balance.transferableAmount);
    let amount = 0;
    const formData = useSelector((state) => state.common.txInfo.value.data);
    const fee = useSelector((state) => state.fee.fee);
    const tokenPrice = useSelector((state) => state.tokenPrice.tokenPrice);
    const type = useSelector((state) => state.common.txName.value.name);
    const gas = useSelector((state) => state.gas.gas);
    const token = useSelector((state) => state.send.token.value);
    const tokenIbc = useSelector((state) => state.sendIbc.token.value);

    let denom;
    if(type === "send" || type === "ibc" || type === "migrateAssets"){
        amount = formData.amount;
        if(type === "send"){
            denom = token.tokenDenom;
        }else if(type === "ibc"){
            denom = tokenIbc.tokenDenom;
        }
    }


    useEffect(() => {
        dispatch(feeChangeHandler({
            value: {
                fee: (FeeInfo.averageFee * (gas.value)),
                feeType: "Average"
            },
            error: ValidateFee(transferableAmount, FeeInfo.averageFee * (gas.value), type, amount, denom)
        }));
    }, [gas.value]);

    const handleFee = (fee, feeValue) => {
        dispatch(feeChangeHandler({
            value: {
                fee: (feeValue * (gas.value)),
                feeType: fee
            },
            error: ValidateFee(transferableAmount, feeValue * (gas.value), type, amount, denom)
        }));
    };

    const activeFeeState = fee.value.feeType;

    return (
        <>
            <div className="fee-container">
                <>
                    <div className={activeFeeState === "Low" ? "fee-box active" : "fee-box"}
                        onClick={() => handleFee("Low", FeeInfo.lowFee)}>
                        <p className="title">Zero</p>
                        <p className="gas"><NumberView
                            value={formatNumber(tokenValueConversion((gas.value) * FeeInfo.lowFee) * tokenPrice)}/>$
                        </p>
                        <p className="token"><NumberView
                            value={formatNumber(tokenValueConversion((gas.value) * FeeInfo.lowFee))}/>
                        {DefaultChainInfo.currency.coinDenom}
                        </p>
                    </div>
                    <div className={activeFeeState === "Average" ? "fee-box active" : "fee-box"}
                        onClick={() => handleFee("Average", FeeInfo.averageFee)}>
                        <p className="title">Low</p>
                        <p className="gas"><NumberView
                            value={formatNumber(tokenValueConversion((gas.value) * FeeInfo.averageFee) * tokenPrice)}/>$
                        </p>
                        <p className="token"><NumberView
                            value={formatNumber(tokenValueConversion((gas.value) * FeeInfo.averageFee))}/>
                        {DefaultChainInfo.currency.coinDenom}
                        </p>
                    </div>
                    <div className={activeFeeState === "High" ? "fee-box active" : "fee-box"}
                        onClick={() => handleFee("High", FeeInfo.highFee)}>
                        <p className="title">High</p>
                        <p className="gas"><NumberView
                            value={formatNumber(tokenValueConversion((gas.value) * FeeInfo.highFee) * tokenPrice)}/>$
                        </p>
                        <p className="token"><NumberView
                            value={formatNumber(tokenValueConversion((gas.value) * FeeInfo.highFee))}/>
                        {DefaultChainInfo.currency.coinDenom}
                        </p>
                    </div>
                </>
            </div>
            <div className="form-field p-0">
                <p className="label"></p>
                <div className="amount-field">
                    <p className="amount-error text-center">
                        {fee.error &&
                        fee.error.message}
                        {gas.feeError &&
                        gas.feeError.message}
                    </p>
                </div>
            </div>
        </>
    );
};


export default Fee;
