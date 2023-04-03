import React from 'react';
import Button from "./../../../components/Button";
import {useDispatch, useSelector} from "react-redux";
import {hideKeyStorePasswordModal, showResultModal} from "../../../store/actions/generateKeyStore";
import  {createKeyStore} from "../../../utils/helper";

const ButtonSubmit = () => {
    const dispatch = useDispatch();
    const password = useSelector((state) => state.generateKeyStore.password);
    const mnemonic = useSelector((state) => state.generateKeyStore.mnemonic);

    const onClick = async () => {
        let encryptedData = createKeyStore(mnemonic.value, password.value);
        let jsonContent = JSON.stringify(encryptedData.Response);
        dispatch(hideKeyStorePasswordModal());
        dispatch(showResultModal());
        await downloadFile(jsonContent);
    };

    const downloadFile = async (jsonContent) => {
        const json = jsonContent;
        const fileName = "KeyStore";
        const blob = new Blob([json], {type: 'application/json'});
        const href = await URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = fileName + ".json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    const disable = (
        password.value === '' || password.error.message !== ''
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


export default ButtonSubmit;
