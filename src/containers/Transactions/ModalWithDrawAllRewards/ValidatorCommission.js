import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {ValidatorCommissionMsg} from "../../../utils/protoMsgHelper";
import {setTxWithDrawTotalValidatorsCommission} from "../../../store/actions/transactions/withdrawTotalRewards";
import {Form} from "react-bootstrap";
import {stringToNumber} from "../../../utils/scripts";
import {DefaultChainInfo} from "../../../config";

const ValidatorCommission = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    let validatorCommissionInfo = useSelector((state) => state.rewards.validatorCommissionInfo);
    const handleCommissionChange = (evt) => {
        let messages = [];
        if (evt.target.checked) {
            messages.push(ValidatorCommissionMsg(validatorCommissionInfo[1]));
        } else {
            messages = [];
        }
        dispatch(setTxWithDrawTotalValidatorsCommission({
            value: messages,
            error: new Error(''),
        }));
    };

    return (
        validatorCommissionInfo[2] ?
            <div className="form-field claim-check-box">
                <p className="label"></p>
                <div className="check-box-container">
                    <p className="label"
                        title={(stringToNumber(validatorCommissionInfo[0]))}>{t("Claim Commission")}({(validatorCommissionInfo[0] * 1).toLocaleString()} {DefaultChainInfo.currency.coinDenom})</p>
                    <Form.Control
                        type="checkbox"
                        name="claimCommission"
                        onChange={handleCommissionChange}
                        required={false}
                    />
                </div>
            </div>
            : ""
    );
};


export default ValidatorCommission;
