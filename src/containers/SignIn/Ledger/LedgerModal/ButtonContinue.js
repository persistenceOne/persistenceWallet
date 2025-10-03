import React from 'react';
import Button from "../../../../components/Button";
import {useDispatch} from "react-redux";
import {ledgerLogin} from "../../../../store/actions/signIn/ledger";
import {useRouter} from "next/router";

const ButtonContinue = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(ledgerLogin(router));
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
