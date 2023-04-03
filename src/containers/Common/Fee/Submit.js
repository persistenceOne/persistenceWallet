import React from 'react';
import Button from "./../../../components/Button";
import {feeSubmitKeyStore} from "../../../store/actions/transactions/fee";
import {useDispatch, useSelector} from "react-redux";
import {ledgerSubmit} from "../../../store/actions/transactions/ledger";
import {LOGIN_INFO} from "../../../constants/localStorage";

const Submit = () => {
    const loginInfo = JSON.parse(localStorage.getItem(LOGIN_INFO));

    const dispatch = useDispatch();

    const onClick = () => {
        if (loginInfo && loginInfo.loginMode === "ledger") {
            dispatch(ledgerSubmit(loginInfo && loginInfo.address, loginInfo && loginInfo.loginMode));
        } else {
            dispatch(feeSubmitKeyStore());
        }
    };

    const fee = useSelector((state) => state.fee.fee);
    const gas = useSelector((state) => state.gas.gas);

    const disable = (
        fee.error.message !== '' || gas.error.message !== ''
    );

    return (
        <div className="buttons">
            <div className="button-section">
                <Button
                    className="button button-primary"
                    type="button"
                    disable={disable}
                    value="Next"
                    onClick={onClick}
                />
            </div>
        </div>
    );
};

export default Submit;
