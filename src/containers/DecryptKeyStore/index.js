import React, {useState} from 'react';
import {Modal as ReactModal} from "react-bootstrap";
import FileInput from "./ModalForm/FileInput";
import Password from "./ModalForm/Password";
import Advanced from "../Common/Advanced";
import Submit from "./ModalForm/Submit";
import Icon from "../../components/Icon";
import {useTranslation} from "react-i18next";
import helper, {decryptKeyStore, makeHdPath} from "../../utils/helper";
import {mnemonicTrim} from "../../utils/scripts";
import wallet from "../../utils/wallet";
import {useDispatch, useSelector} from "react-redux";
import {setTxKeyStore, setTxKeyStorePassword} from "../../store/actions/transactions/keyStore";
import {setAccountIndex, setAccountNumber, setBip39Passphrase} from "../../store/actions/transactions/advanced";

const KeyStore = (props) => {
    const {t} = useTranslation();
    const [show, setShow] = useState(true);
    const [error, setError] = useState("");
    const [response, setResponse] = useState([]);
    const password = useSelector((state) => state.keyStore.password);
    const keyStoreData = useSelector((state) => state.keyStore.keyStore);
    let accountNumber = useSelector((state) => state.advanced.accountNumber);
    let accountIndex = useSelector((state) => state.advanced.accountIndex);
    let bip39PassPhrase = useSelector((state) => state.advanced.bip39PassPhrase);

    const dispatch = useDispatch();

    const handleClose = () => {
        setShow(false);
        props.setRoutName("");
        dispatch(setTxKeyStore(
            {
                value: "",
                error: {
                    message: '',
                }
            }));
        dispatch(setTxKeyStorePassword({
            value: "",
            error: {
                message: '',
            }
        }));
        dispatch(setAccountNumber({
            value: "",
            error: {
                message: '',
            }
        }));
        dispatch(setAccountIndex({
            value: "",
            error: {
                message: '',
            }
        }));
        dispatch(setBip39Passphrase({
            value: "",
            error: {
                message: '',
            }
        }));
    };


    const keyStoreDecryptSubmit = () => {
        const fileReader = new FileReader();
        let mnemonic = "";
        fileReader.readAsText(keyStoreData.value, "UTF-8");
        fileReader.onload = async event => {
            const res = JSON.parse(event.target.result);
            const decryptedData = decryptKeyStore(res, password.value);
            if (decryptedData.error != null) {
                setError(decryptedData.error);
            } else {
                mnemonic = mnemonicTrim(decryptedData.mnemonic);

                accountNumber = helper.getAccountNumber(accountNumber.value);
                accountIndex = helper.getAccountNumber(accountIndex.value);
                bip39PassPhrase = bip39PassPhrase.value;

                const walletPath = makeHdPath(accountNumber, accountIndex);
                const responseData = await wallet.createWallet(mnemonic, walletPath, bip39PassPhrase);
                const data = [mnemonic, responseData];
                setResponse(data);
                dispatch(setTxKeyStore(
                    {
                        value: "",
                        error: {
                            message: '',
                        }
                    }));
                dispatch(setTxKeyStorePassword({
                    value: "",
                    error: {
                        message: '',
                    }
                }));
                dispatch(setAccountNumber({
                    value: "",
                    error: {
                        message: '',
                    }
                }));
                dispatch(setAccountIndex({
                    value: "",
                    error: {
                        message: '',
                    }
                }));
                dispatch(setBip39Passphrase({
                    value: "",
                    error: {
                        message: '',
                    }
                }));

            }
        };
    };
    
    return (
        <>
            <ReactModal
                animation={false}
                backdrop="static"
                className="create-wallet-modal seed modal"
                centered={true}
                keyboard={false}
                show={show}
                onHide={handleClose}>
                <ReactModal.Header closeButton={true}>
                    <p>{t("DECRYPT_KEY_STORE")}</p>
                </ReactModal.Header>
                <ReactModal.Body className="create-wallet-body import-wallet-body">
                    {!response.length ?
                        <>
                            <FileInput/>
                            <Password/>
                            <Advanced/>
                            <Submit onClick={keyStoreDecryptSubmit}/>
                            {error !== "" ?
                                <div className="login-error"><p className="error-response">{error}</p></div>
                                : ""
                            }
                            <div className="note-section">
                                <div className="exclamation"><Icon
                                    viewClass="arrow-right"
                                    icon="exclamation"/></div>
                                <p>{t("PRIVATE_KEY_WARNING")}</p>
                            </div>
                        </>
                        :
                        <>
                            <p className="mnemonic-result">
                                <b>{t("MNEMONIC")}: </b>{response && response[0]}</p>
                            <p className="mnemonic-result">
                                <b>{t("WALLET_PATH")}: </b>{response && response[1].walletPath}</p>
                            <p className="mnemonic-result"><b>{t("ADDRESS")}: </b>{response && response[1].address}
                            </p>
                        </>
                    }
                </ReactModal.Body>
            </ReactModal>
        </>
    );
};

export default KeyStore;
