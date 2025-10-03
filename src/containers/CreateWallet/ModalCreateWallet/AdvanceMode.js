import React, {useContext, useState} from "react";
import {Accordion, AccordionContext, Card, Form, Modal, useAccordionToggle,} from "react-bootstrap";
import wallet from "../../../utils/wallet";
import Icon from "../../../components/Icon";
import GeneratePrivateKey from "./GeneratePrivateKey";
import {useRouter} from "next/router";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {addressLogin, setAddress} from "../../../store/actions/signIn/address";
import {makeHdPath} from "../../../utils/helper";
import {AccountInfo} from "../../../config";

const AdvanceMode = (props) => {
    const {t} = useTranslation();
    const router = useRouter();
    const [show, setShow] = useState(true);
    const [advanceForm, setAdvanceForm] = useState(true);
    const [responseShow, setResponseShow] = useState(false);
    const [response, setResponse] = useState("");
    const [passphraseError, setPassphraseError] = useState(false);
    const [generateKey, setGenerateKey] = useState(false);
    const [advanceMode, setAdvanceMode] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        let accountNumber = 0;
        let addressIndex = 0;
        let bip39Passphrase = "";
        if (advanceMode) {
            accountNumber = document.getElementById('createAccountNumber').value;
            addressIndex = document.getElementById('createAccountIndex').value;
            bip39Passphrase = document.getElementById('createbip39Passphrase').value;
            if (accountNumber === "") {
                accountNumber = 0;
            }
            if (addressIndex === "") {
                addressIndex = 0;
            }
        }

        const walletPath = makeHdPath(accountNumber, addressIndex);
        const responseData = await wallet.createWallet(props.mnemonic, walletPath, bip39Passphrase);
        setResponse(responseData);
        setResponseShow(true);
        setAdvanceForm(false);
        setAdvanceMode(false);
    };
    const handleRoute = (key) => {
        if (key === 'generateKey') {
            setGenerateKey(true);
            setShow(false);
        }
        if (key === "hideGenerateKey") {
            setGenerateKey(false);
            setShow(true);
        }
    };
    const handlePassphrase = (evt) => {
        const result = (evt.target.value).length === 50;
        setPassphraseError(result);
    };
    const handleClose = () => {
        setShow(false);
        props.handleClose();
    };
    const handleLogin = () => {
        dispatch(setAddress({
            value: response.address,
            error: {
                message: ''
            }
        }));
        dispatch(addressLogin(router, response.address));
    };
    const handlePrevious = (formName) => {
        if (formName === "advanceForm") {
            setAdvanceForm(false);
            props.setAccountInfo(false);
            props.setShow(true);
            props.setMnemonicQuiz(true);
        }
        if (formName === "response") {
            setAdvanceForm(true);
            setResponseShow(false);
        }
    };

    const handleKeypress = e => {
        if (e.key === "Enter") {
            handleSubmit(e);
        }
    };


    const handleAccountNumberKeypress = e => {
        if (e.key === "e" || e.key === "-" || e.key === "+") {
            e.preventDefault();
        } else if (e.key === "Enter") {
            handleSubmit(e);
        } else {
            const accountNumber = document.getElementById('createAccountNumber').value;
            if (parseInt(accountNumber) > AccountInfo.maxAccountNumber || parseInt(accountNumber) < 0) {
                e.preventDefault();
            }
        }
    };

    const handleIndexKeypress = e => {
        if (e.key === "e" || e.key === "-" || e.key === "+") {
            e.preventDefault();
        } else if (e.key === "Enter") {
            handleSubmit(e);
        } else {
            const addressIndex = document.getElementById('createAccountIndex').value;
            if (parseInt(addressIndex) > AccountInfo.maxAccountIndex|| parseInt(addressIndex) < 0) {
                e.preventDefault();
            }
        }
    };

    function ContextAwareToggle({eventKey, callback}) {
        const currentEventKey = useContext(AccordionContext);

        const decoratedOnClick = useAccordionToggle(
            eventKey,
            () => callback && callback(eventKey),
        );
        const handleAccordion = (event) => {
            decoratedOnClick(event);
            setAdvanceMode(!advanceMode);
        };
        const isCurrentEventKey = currentEventKey === eventKey;

        return (
            <button
                type="button"
                className="accordion-button"
                onClick={handleAccordion}
            >
                {isCurrentEventKey ?
                    <Icon
                        viewClass="arrow-right"
                        icon="up-arrow"/>
                    :
                    <Icon
                        viewClass="arrow-right"
                        icon="down-arrow"/>}

            </button>
        );
    }

    return (
        <>
            <Modal backdrop="static" show={show} onHide={handleClose} centered
                className="create-wallet-modal seed">
                {advanceForm ?
                    <>
                        <Modal.Header closeButton>
                            <div className="previous-section">
                                <button className="button" onClick={() => handlePrevious("advanceForm")}>
                                    <Icon
                                        viewClass="arrow-right"
                                        icon="left-arrow"/>
                                </button>
                            </div>
                            <h3 className="heading">{t("CREATE_WALLET")}</h3>
                        </Modal.Header>
                        <div className="create-wallet-body create-wallet-form-body">
                            <div className="key-download" onClick={() => handleRoute('generateKey')}>
                                <p>{t("GENERATE_KEY_STORE")}</p>
                                <Icon viewClass="arrow-icon" icon="left-arrow"/>
                            </div>
                            <Form onSubmit={handleSubmit} className="advancemode-form">
                                <Accordion className="advanced-wallet-accordion">
                                    <Card>
                                        <Card.Header>
                                            <p>
                                                {t("ADVANCED")}
                                            </p>
                                            <ContextAwareToggle eventKey="0">Click me!</ContextAwareToggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="0">
                                            <>

                                                <div className="form-field">
                                                    <p className="label">{t("ACCOUNT")}</p>
                                                    <div className="form-control-section flex-fill">
                                                        <Form.Control
                                                            type="number"
                                                            max={AccountInfo.maxAccountNumber}
                                                            name="accountNumber"
                                                            id="createAccountNumber"
                                                            onKeyPress={handleAccountNumberKeypress}
                                                            placeholder={t("ACCOUNT_NUMBER")}
                                                            required={false}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-field">
                                                    <p className="label">{t("ACCOUNT_INDEX")}</p>
                                                    <div className="form-control-section flex-fill">
                                                        <Form.Control
                                                            type="number"
                                                            max={AccountInfo.maxAccountIndex}
                                                            name="accountIndex"
                                                            id="createAccountIndex"
                                                            onKeyPress={handleIndexKeypress}
                                                            placeholder={t("ACCOUNT_INDEX")}
                                                            required={false}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-field passphrase-field">
                                                    <p className="label">{t("BIP_PASSPHRASE")}</p>
                                                    <div className="form-control-section flex-fill">
                                                        <Form.Control
                                                            type="password"
                                                            name="bip39Passphrase"
                                                            id="createbip39Passphrase"
                                                            maxLength="50"
                                                            onKeyPress={handleKeypress}
                                                            placeholder={t("ENTER_BIP_PASSPHRASE")}
                                                            onChange={handlePassphrase}
                                                            required={false}
                                                        />
                                                    </div>
                                                    {passphraseError ?
                                                        <span
                                                            className="passphrase-error">{t("BIP_PASSPHRASE_ERROR")}</span>
                                                        : null}
                                                </div>

                                            </>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>
                                <div className="buttons">
                                    <button className="button button-primary">{t("NEXT")}
                                    </button>
                                </div>
                            </Form>
                        </div>
                    </>
                    : null
                }
                {responseShow ?
                    <>
                        <Modal.Header closeButton>
                            <div className="previous-section">
                                <button className="button" onClick={() => handlePrevious("response")}>
                                    <Icon
                                        viewClass="arrow-right"
                                        icon="left-arrow"/>
                                </button>
                            </div>
                            <h3 className="heading">{t("CREATE_WALLET")}</h3>
                        </Modal.Header>
                        <div className="create-wallet-body create-wallet-form-body">
                            <p className="mnemonic-result"><b>{t("WALLET_PATH")}: </b>{response.walletPath}</p>
                            <p className="mnemonic-result"><b>{t("ADDRESS")} generated with Coin Type 118: </b>{response.address}</p>
                            <div className="buttons">
                                <button className="button button-primary" onClick={handleLogin}>Login</button>
                            </div>
                            <div className="note-section">
                                <div className="exclamation"><Icon
                                    viewClass="arrow-right"
                                    icon="exclamation"/></div>
                                <p>{t("WALLET_PATH_WARNING")}</p>
                            </div>
                        </div>
                    </>
                    : null}
            </Modal>
            {generateKey ?
                <GeneratePrivateKey mnemonic={props.mnemonic} handleRoute={handleRoute} setGenerateKey={setGenerateKey}
                    routeValue="hideGenerateKey" formName="Create Wallet"/>
                : null
            }
        </>
    );
};
export default AdvanceMode;
