import {Modal as ReactModal} from 'react-bootstrap';
import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import Password from "./Password";
import Submit from "./Submit";
import Icon from "../../../components/Icon";
import {useTranslation} from "react-i18next";
import {hideKeyStoreNewPasswordModal, showKeyStoreModal} from "../../../store/actions/changePassword";

const ModalNewPassword = () => {
    const {t} = useTranslation();
    const show = useSelector((state) => state.changePassword.newPasswordModal);
    const response = useSelector((state) => state.changePassword.response);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(hideKeyStoreNewPasswordModal());
    };

    const keyStorePrevious = () => {
        dispatch(hideKeyStoreNewPasswordModal());
        dispatch(showKeyStoreModal());
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
                <div className="form-field">
                    <p className="label"> {t("ADDRESS")}</p>
                    <div className="available-tokens">
                        <p className="tokens">{response.value.address} </p>
                    </div>
                </div>
                <Password/>
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


export default ModalNewPassword;
