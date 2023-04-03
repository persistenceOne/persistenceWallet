import {Modal as ReactModal} from 'react-bootstrap';
import React from 'react';
import {useTranslation} from "react-i18next";
import Password from "./Password";
import {useDispatch, useSelector} from "react-redux";
import ButtonSubmit from "./Submit";
import {hideKeyStorePasswordModal, showKeyStoreMnemonicModal} from "../../../store/actions/generateKeyStore";
import Icon from "../../../components/Icon";

const ModalPassword = () => {
    const dispatch = useDispatch();
    const show = useSelector((state) => state.generateKeyStore.passwordModal);

    const {t} = useTranslation();

    const handleClose = () => {
        dispatch(hideKeyStorePasswordModal());
    };

    const handlePrevious = () => {
        dispatch(hideKeyStorePasswordModal());
        dispatch(showKeyStoreMnemonicModal());
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
                <div className="previous-section txn-header">
                    <button className="button" onClick={() => handlePrevious()}>
                        <Icon
                            viewClass="arrow-right"
                            icon="left-arrow"/>
                    </button>
                </div>
                <h3 className="heading">{t('GENERATE_KEY_STORE')}
                </h3>
            </ReactModal.Header>
            <ReactModal.Body className="create-wallet-body create-wallet-form-body">
                <Password/>
                <ButtonSubmit/>
            </ReactModal.Body>
        </ReactModal>

    );
};

export default ModalPassword;
