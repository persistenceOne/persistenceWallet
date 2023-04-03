import React from 'react';
import Button from "../../../components/Button";
import {useDispatch, useSelector} from "react-redux";
import {keplrSubmit} from "../../../store/actions/transactions/keplr";
import {hideTxWithDrawTotalModal, submitFormData} from "../../../store/actions/transactions/withdrawTotalRewards";
import {setTxIno} from "../../../store/actions/transactions/common";
import {LOGIN_INFO} from "../../../constants/localStorage";

const ButtonNext = () => {
    const dispatch = useDispatch();
    const onClick = () => {
        let messages = [];
        if (validatorsList.value.length) {
            messages = validatorsList.value;
        }
        if (validatorCommission.value.length) {
            messages.push(validatorCommission.value[0]);
        }
        dispatch(submitFormData(messages));
    };

    const loginInfo = JSON.parse(localStorage.getItem(LOGIN_INFO));
    let validatorsList = useSelector((state) => state.mulitpleRewardsWithDraw.validatorsList);
    let validatorsRewards = useSelector((state) => state.mulitpleRewardsWithDraw.rewards);
    let validatorCommission = useSelector((state) => state.mulitpleRewardsWithDraw.commission);
    const memo = useSelector((state) => state.mulitpleRewardsWithDraw.memo);

    const onClickKeplr = () => {
        let messages = [];
        if (validatorsList.value.length) {
            messages = validatorsList.value;
        }
        if (validatorCommission.value.length) {
            messages.push(validatorCommission.value[0]);
        }
        dispatch(setTxIno({
            value: {
                modal: hideTxWithDrawTotalModal(),
                data: {
                    message: '',
                    memo: '',
                }
            }
        }));
        dispatch(keplrSubmit(messages));
    };
    const disable = (
        validatorsRewards.value === 0 && validatorCommission.value.length === 0 || memo.error.message !== ''
    );

    return (
        <div className="buttons">
            <div className="button-section">
                <Button
                    className="button button-primary"
                    type="button"
                    disable={disable}
                    value="Next"
                    onClick={loginInfo && loginInfo.loginMode === 'keplr' ? onClickKeplr : onClick}
                />
            </div>
        </div>
    );
};


export default ButtonNext;
