import React from 'react';
import Button from "./../../../components/Button";
import {useDispatch, useSelector} from "react-redux";
import {keyStoreNewPasswordModalNext, showResultModal} from "../../../store/actions/changePassword";

const Submit = () => {
    const password = useSelector((state) => state.changePassword.newPassword);

    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(keyStoreNewPasswordModalNext());
        dispatch(showResultModal());
    };

    const disable = (
        password.error.message !== ''
    );

    return (
        <div className="buttons">
            <div className="button-section">
                <Button
                    className="button button-primary"
                    type="button"
                    disable={disable}
                    value="Submit"
                    onClick={onClick}
                />
            </div>
        </div>
    );
};

export default Submit;
