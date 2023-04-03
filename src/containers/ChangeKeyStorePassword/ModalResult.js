import {Modal as ReactModal} from 'react-bootstrap';
import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import Icon from "../../components/Icon";
import {createKeyStore} from "../../utils/helper";
import {hideResultModal} from "../../store/actions/changePassword";

const ModalResult = () => {
    const {t} = useTranslation();

    const show = useSelector((state) => state.changePassword.resultModal);
    const password = useSelector((state) => state.changePassword.newPassword);
    const response = useSelector((state) => state.changePassword.response);
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(hideResultModal());
    };

    const handleResetSubmit = async () => {
        const mnemonic = response.value.mnemonic;
        let encryptedData = createKeyStore(mnemonic, password.value);
        let jsonContent = JSON.stringify(encryptedData.Response);
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
                <h3 className="heading">{t("KEYSTORE_PASSWORD_RESET")}</h3>
            </ReactModal.Header>
            <ReactModal.Body className="create-wallet-body import-wallet-body">
                <div className="download-keystore-box">
                    <p onClick={handleResetSubmit}>Download New KeyStore File</p>
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
