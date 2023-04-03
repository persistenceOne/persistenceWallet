import React from 'react';
import ModalMnemonic from "./ModalMnemonic";
import ModalPassword from "./ModalPassword";
import ModalResult from "./ModalResult";

const GenerateKeyStore = () => {
    return (
        <>
            <ModalMnemonic/>
            <ModalPassword/>
            <ModalResult/>
        </>
    );
};


export default GenerateKeyStore;
