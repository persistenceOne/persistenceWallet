import React, {useState} from "react";
import {Form, Modal,} from "react-bootstrap";
import Icon from "../../../components/Icon";
import {createKeyStore} from "../../../utils/helper";
import {useTranslation} from "react-i18next";

const GeneratePrivateKey = (props) => {
    const {t} = useTranslation();
    const [keyFile, setKeyFile] = useState(false);
    const [show, setShow] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const handleSubmit = async event => {
        event.preventDefault();
        const regex = /^\S{3}\S+$/;
        const password = event.target.password.value;
        if (regex.test(password)) {
            const mnemonic = props.mnemonic;
            let encryptedData = createKeyStore(mnemonic, password);
            let jsonContent = JSON.stringify(encryptedData.Response);
            setKeyFile(true);
            downloadFile(jsonContent);
        } else {
            setErrorMessage("Password must be greater than 3 letters and no spaces allowed");
        }
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

    const handleClose = () => {
        setShow(false);
        props.handleRoute(props.routeValue);
        if (props.formName === "Generate KeyStore File") {
            props.handleClose();
        }
    };
    const handlePrevious = (formName) => {
        if (formName === "generateKey") {
            setShow(false);
            props.setGenerateKey(false);
            props.handleRoute(props.routeValue);
        }
    };

    return (
        <Modal backdrop="static" show={show} onHide={handleClose} centered className="create-wallet-modal seed">
            <Modal.Header closeButton>
                <div className="previous-section">
                    <button className="button" onClick={() => handlePrevious("generateKey")}>
                        <Icon
                            viewClass="arrow-right"
                            icon="left-arrow"/>
                    </button>
                </div>
                <h3 className="heading">{props.formName}</h3>
            </Modal.Header>
            <div className="create-wallet-body create-wallet-form-body">
                <Form onSubmit={handleSubmit} className="form-privatekey">
                    {!keyFile ?
                        <div className="form-field">
                            <p className="label">{t("PASSWORD")}</p>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder={t("ENTER_PASSWORD")}
                                autoComplete={"new-password"}
                                required={true}
                            />
                        </div>
                        : null
                    }

                    {!keyFile ?
                        <>
                            <div className="buttons">
                                <button className="button button-primary">{t("SUBMIT")}</button>
                            </div>
                            <div className="note-section">
                                <div className="exclamation"><Icon
                                    viewClass="arrow-right"
                                    icon="exclamation"/></div>
                                <p>{t("PRIVATE_KEY_PASSWORD_NOTE")}</p>
                            </div>

                            {
                                errorMessage !== "" ?
                                    <p className="form-error">{errorMessage}</p>
                                    : null
                            }
                        </>
                        :
                        null
                    }


                </Form>
                {keyFile ?
                    <>
                        <div className="buttons">
                            <button className="button button-primary" onClick={handleClose}>{t("DONE")}</button>
                        </div>
                        <div className="note-section">
                            <div className="exclamation"><Icon
                                viewClass="arrow-right"
                                icon="exclamation"/></div>
                            <p>{t("KEYSTORE_FILE_NOTE")}</p>
                        </div>

                    </>
                    : null
                }

            </div>
        </Modal>
    );
};
export default GeneratePrivateKey;
