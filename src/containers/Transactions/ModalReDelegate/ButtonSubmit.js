import React from 'react';
import Button from "../../../components/Button";
import {hideTxReDelegateModal, submitFormData} from "../../../store/actions/transactions/redelegate";
import {useDispatch, useSelector} from "react-redux";
import {keplrSubmit} from "../../../store/actions/transactions/keplr";
import {RedelegateMsg} from "../../../utils/protoMsgHelper";
import {setTxIno} from "../../../store/actions/transactions/common";
import {LOGIN_INFO} from "../../../constants/localStorage";
import {stringToNumber} from "../../../utils/scripts";
import {DefaultChainInfo} from "../../../config";

const ButtonSubmit = () => {
    const dispatch = useDispatch();
    const loginInfo = JSON.parse(localStorage.getItem(LOGIN_INFO));
    const amount = useSelector((state) => state.redelegate.amount);
    const memo = useSelector((state) => state.redelegate.memo);
    const toAddress = useSelector((state) => state.redelegate.toAddress);
    const validator = useSelector((state) => state.validators.validator.value);

    const onClick = () => {
        dispatch(submitFormData([RedelegateMsg(loginInfo && loginInfo.address, validator.operatorAddress, toAddress.value, (amount.value * DefaultChainInfo.uTokenValue).toFixed(0))]));
    };


    const disable = (
        amount.value === '' || stringToNumber(amount.value) === 0 || amount.error.message !== '' || toAddress.value === '' || toAddress.error.message !== '' || memo.error.message !== ''
    );

    const onClickKeplr = () => {
        dispatch(setTxIno({
            value: {
                modal: hideTxReDelegateModal(),
                data: {
                    message: '',
                    memo: '',
                }
            }
        }));
        dispatch(keplrSubmit([RedelegateMsg(loginInfo && loginInfo.address, validator.operatorAddress, toAddress.value, (amount.value * DefaultChainInfo.uTokenValue).toFixed(0))]));
    };

    return (
        <div className="buttons">
            <div className="button-section">
                <Button
                    className="button button-primary"
                    type="button"
                    disable={disable}
                    value="Submit"
                    onClick={loginInfo && loginInfo.loginMode === 'keplr' ? onClickKeplr : onClick}
                />
            </div>
        </div>
    );
};


export default ButtonSubmit;
