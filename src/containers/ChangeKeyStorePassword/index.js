import React from 'react';
import ModalKeyStore from "./ModalKeyStore";
import ModalNewPassword from "./ModalNewPassword";
import ModalResult from "./ModalResult";

const ChangeKeyStorePassword = () => {
    return (
        <>
            <ModalKeyStore/>
            <ModalNewPassword/>
            <ModalResult/>
        </>
    );
};


export default ChangeKeyStorePassword;
