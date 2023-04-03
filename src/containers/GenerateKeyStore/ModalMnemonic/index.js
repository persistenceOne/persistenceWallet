import {Modal as ReactModal} from 'react-bootstrap';
import React from 'react';
import {useTranslation} from "react-i18next";
import Mnemonic from "./Mnemonic";
import {useDispatch, useSelector} from "react-redux";
import ButtonSubmit from "./Submit";
import {hideKeyStoreMnemonicModal} from "../../../store/actions/generateKeyStore";
import {showKeyStoreModal} from "../../../store/actions/changePassword";

const ModalMnemonic = () => {
    const dispatch = useDispatch();
    const show = useSelector((state) => state.generateKeyStore.mnemonicModal);

    const {t} = useTranslation();

    const handleClose = () => {
        dispatch(hideKeyStoreMnemonicModal());
    };

    const handleRoute = () => {
        dispatch(hideKeyStoreMnemonicModal());
        dispatch(showKeyStoreModal());
    };


    return (

        <ReactModal
            animation={false}
            backdrop="static"
            className="create-wallet-modal seed"
            centered={true}
            keyboard={false}
            show={show}
            onHide={handleClose}>
            <ReactModal.Header closeButton>
                <h3 className="heading">{t('GENERATE_KEY_STORE')}
                </h3>
            </ReactModal.Header>
            <ReactModal.Body className="create-wallet-body create-wallet-form-body">
                <Mnemonic/>
                <ButtonSubmit/>
                <div className="buttons">
                    <p className="button-link" onClick={() => handleRoute()}>{t('CHANGE_KEYSTORE_PASSWORD')}</p>
                </div>
            </ReactModal.Body>
        </ReactModal>

    );
};

export default ModalMnemonic;
