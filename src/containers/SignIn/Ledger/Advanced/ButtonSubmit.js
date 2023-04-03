import React from 'react';
import Button from "../../../../components/Button";
import {useDispatch, useSelector} from "react-redux";
import {fetchLedgerAddress} from "../../../../store/actions/signIn/ledger";
import helper from "../../../../utils/helper";

const ButtonSubmit = () => {
    const dispatch = useDispatch();
    const accountIndex = useSelector((state) => state.signInLedger.accountIndex);
    const accountNumber = useSelector((state) => state.signInLedger.accountNumber);

    const onClick = () => {
        dispatch(fetchLedgerAddress(helper.getAccountNumber(accountNumber.value), helper.getAccountNumber(accountIndex.value)));
    };

    const disabled = (
        accountIndex.error.message !== "" || accountNumber.error.message !== ""
    );

    return (
        <Button
            className="button button-primary"
            type="button"
            value="Submit"
            disable={disabled}
            onClick={onClick}
        />
    );
};

export default ButtonSubmit;
