import {Modal as ReactModal} from 'react-bootstrap';
import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {hideResultModal} from "../../../store/actions/generateKeyStore";
import Icon from "../../../components/Icon";

const ModalResult = () => {
    const {t} = useTranslation();

    const show = useSelector((state) => state.generateKeyStore.resultModal);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(hideResultModal());
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
            <ReactModal.Header closeButton={true}>
                <h3 className="heading">{t("KEYSTORE_PASSWORD_RESET")}</h3>
            </ReactModal.Header>
            <ReactModal.Body className="create-wallet-body create-wallet-form-body">
                <div className="downloaded-keystore-box">
                    <p>{t("KEYSTORE_DOWNLOADED_SUCCESSFULLY")}</p>
                </div>
                <div className="note-section">
                    <div className="exclamation"><Icon
                        viewClass="arrow-right"
                        icon="exclamation"/></div>
                    <p>{t("PRIVATE_KEY_PASSWORD_NOTE")}</p>
                </div>
            </ReactModal.Body>
        </ReactModal>
    );
};


export default ModalResult;
