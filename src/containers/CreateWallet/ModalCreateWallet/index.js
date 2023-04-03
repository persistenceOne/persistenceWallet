import React, {useState} from "react";
import {Modal} from "react-bootstrap";
import CreateWallet from "./CreateWallet";
import {useTranslation} from "react-i18next";

const ModalCreateWallet = (props) => {
    const {t} = useTranslation();
    const [show, setShow] = useState(true);
    const [createWallet, setCreatWallet] = useState(false);
    const handleClose = () => {
        setShow(false);
        props.setRoutName("");
    };


    const handleCreateForm = (name) => {
        if (name === 'createWalletForm') {
            setShow(false);
            setCreatWallet(true);
        }
    };

    return (
        <div>
            <Modal show={show} onHide={handleClose} centered className="create-wallet-modal">
                <Modal.Header className="info-modal-header " closeButton>
                    <p>{t("ABOUT_WALLET")}</p>
                </Modal.Header>
                <Modal.Body className="import-wallet-body pt-3">
                    <div className="info-box">
                        <p><b>{t("SIGNUP_NOTE_HEADING")}
                        </b></p>
                        <ul>
                            <li>{t("SIGNUP_NOTE_TEXT1")}
                            </li>
                            <li>{t("SIGNUP_NOTE_TEXT2")}
                            </li>
                        </ul>
                    </div>
                    <div className="buttons">
                        <button className="button button-primary"
                            onClick={() => handleCreateForm("createWalletForm")}>{t("NEXT")}
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
            {
                createWallet ?
                    <CreateWallet handleClose={handleClose} setShow={setShow}
                        setCreatWallet={setCreatWallet}/>
                    :
                    null
            }
        </div>

    );
};
export default ModalCreateWallet;
