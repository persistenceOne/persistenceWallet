import React from 'react';
import Button from "../../../../components/Button";
import {useDispatch} from "react-redux";
import {ledgerLogin} from "../../../../store/actions/signIn/ledger";
import {useHistory} from "react-router-dom";

const ButtonContinue = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(ledgerLogin(history));
    };

    return (
        <Button
            className="button button-primary"
            type="button"
            value="Continue"
            onClick={onClick}
        />
    );
};

export default ButtonContinue;
