import React from 'react';
import Button from "../../../components/Button";
import {useSelector} from "react-redux";

const Submit = (props) => {

    const accountNumber = useSelector((state) => state.advanced.accountNumber);
    const accountIndex = useSelector((state) => state.advanced.accountIndex);
    const bip39PassPhrase = useSelector((state) => state.advanced.bip39PassPhrase);
    const keyStoreData = useSelector((state) => state.keyStore.keyStore);
    const password = useSelector((state) => state.keyStore.password);

    const disable = (
        keyStoreData.error.message !== '' || keyStoreData.value === '' || password.value === '' ||
        password.error.message !== '' || accountNumber.error.message !== '' || accountIndex.error.message !== ''
        || bip39PassPhrase.error.message !== ''
    );

    return (
        <div className="buttons">
            <div className="button-section">
                <Button
                    disable={disable}
                    className="button button-primary"
                    type="button"
                    value="Next"
                    onClick={props.onClick}
                />
            </div>
        </div>
    );
};

export default Submit;
