import {Modal as ReactModal} from 'react-bootstrap';
import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {hideKeyStoreModal} from "../../../store/actions/changePassword";
import {showKeyStoreMnemonicModal} from "../../../store/actions/generateKeyStore";
import FileInput from "./FileInput";
import Password from "./Password";
import Submit from "./Submit";
import Icon from "../../../components/Icon";
import Advanced from "../../Common/Advanced";
import {useTranslation} from "react-i18next";
import CoinType from "./CoinType";

const ModalKeyStore = () => {
    const {t} = useTranslation();
    const show = useSelector((state) => state.changePassword.keyStoreModal);
    const response = useSelector((state) => state.changePassword.response);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(hideKeyStoreModal());
    };


    const keyStorePrevious = () => {
        dispatch(hideKeyStoreModal());
        dispatch(showKeyStoreMnemonicModal());
    };

    return (
        <ReactModal
            animation={false}
            backdrop="static"
            className="modal-custom keystore-m"
            centered={true}
            keyboard={false}
            show={show}
            onHide={handleClose}>
            <ReactModal.Header closeButton={true}>
                <div className="previous-section txn-header">
                    <button className="button" onClick={() => keyStorePrevious()}>
                        <Icon
                            viewClass="arrow-right"
                            icon="left-arrow"/>
                    </button>
                </div>
                <h3 className="heading">{t("KEYSTORE_PASSWORD_RESET")}</h3>
            </ReactModal.Header>
            <ReactModal.Body className="create-wallet-body import-wallet-body">
                <FileInput/>
                <Password/>
                <CoinType/>
                <Advanced/>
                {
                    response.error.message !== "" ?
                        <p className="form-error">{response.error.message}</p>
                        : null
                }
                <Submit/>
            </ReactModal.Body>
        </ReactModal>
    );
};


export default ModalKeyStore;
