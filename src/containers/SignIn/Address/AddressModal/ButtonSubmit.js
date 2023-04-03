import React from 'react';
import Button from "../../../../components/Button";
import {useDispatch} from "react-redux";
import {addressLogin} from "../../../../store/actions/signIn/address";
import {useHistory} from "react-router-dom";

const ButtonSubmit = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(addressLogin(history));
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
