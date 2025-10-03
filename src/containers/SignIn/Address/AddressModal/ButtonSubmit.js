import React from 'react';
import Button from "../../../../components/Button";
import {useDispatch} from "react-redux";
import {addressLogin} from "../../../../store/actions/signIn/address";
import {useRouter} from "next/router";

const ButtonSubmit = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(addressLogin(router));
    };

    return (
        <Button
            className="button button-primary"
            type="button"
            value="Submit"
            onClick={onClick}
        />
    );
};

export default ButtonSubmit;
