import React from 'react';
import Button from "../../../../components/Button";
import {useDispatch} from "react-redux";
import {keplrLogin} from "../../../../store/actions/signIn/keplr";
import {useRouter} from "next/router";

const ButtonContinue = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(keplrLogin(router));
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
