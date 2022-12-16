import React from 'react';
import Button from "../../../components/Button";
import {useDispatch, useSelector} from "react-redux";
import {trimWhiteSpaces} from "../../../utils/scripts";
import {LOGIN_INFO} from "../../../constants/localStorage";
import {MsgSend} from "cosmjs-types/cosmos/bank/v1beta1/tx";
import {setTxSendAmount, submitFormData} from "../../../store/actions/transactions/migrateAssets";
import {DefaultChainInfo} from "../../../config";
import {tokenValueConversion} from "../../../utils/helper";
const msgSendTypeUrl = "/cosmos.bank.v1beta1.MsgSend";

const SendMsg =  (fromAddress, toAddress, amount) => {
    return {
        typeUrl: msgSendTypeUrl,
        value: MsgSend.fromPartial({
            fromAddress: trimWhiteSpaces(fromAddress),
            toAddress: trimWhiteSpaces(toAddress),
            amount: amount,
        }),
    };
};

const ButtonMigrate = () => {
    const dispatch = useDispatch();
    const tokenList = useSelector((state) => state.balance.tokenList);
    const loginInfo = JSON.parse(localStorage.getItem(LOGIN_INFO));

    const onClick = () => {
        let balance = [];
        tokenList.forEach((item) => {
            let denom;
            if ( item.denom === DefaultChainInfo.currency.coinMinimalDenom) {
                dispatch(
                    setTxSendAmount({
                        value: tokenValueConversion(item.amount),
                        error: ""
                    })
                );
            }
            denom = item.denom;
            balance.push({
                denom:denom,
                amount:item.amount
            });
        });

        dispatch(submitFormData([SendMsg(
            loginInfo && loginInfo.address,   loginInfo?.coin118Response.address, balance)]
        ));
    };

    return (
        <div className="buttons">
            <div className="button-section">
                <Button
                    className="button button-primary"
                    type="button"
                    disable={false}
                    value="Migrate"
                    onClick={onClick}
                />
            </div>
        </div>
    );
};


export default ButtonMigrate;

