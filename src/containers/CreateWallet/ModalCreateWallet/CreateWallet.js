import React, {useEffect, useState} from "react";
import {Form, Modal} from "react-bootstrap";
import Icon from "../../../components/Icon";
import wallet from "../../../utils/wallet";
import AdvanceMode from "./AdvanceMode";
import Copy from "../../../components/Copy";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {showSignInModal} from "../../../store/actions/signIn/modal";
import {randomNum} from "../../../utils/scripts";

const CreateWallet = (props) => {
    const {t} = useTranslation();
    const [show, setShow] = useState(true);
    const [mnemonicQuiz, setMnemonicQuiz] = useState(false);
    const [keysForm, setKeysForm] = useState(true);
    const [mnemonicList, setMnemonicList] = useState('');
    const [accountInfo, setAccountInfo] = useState(false);
    const [randomMnemonicList, setRandomMnemonicList] = useState([]);
    const [randomNumberList, setRandomNumberList] = useState([]);
    const [quizError, setQuizError] = useState(false);
    const [response, setResponse] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const dispatch = useDispatch();

    const handleClose = () => {
        setShow(false);
        props.handleClose();
    };
    useEffect(() => {
        const getWallet = async () => {
            const responseData = await wallet.createRandomWallet();
            setResponse(responseData);
            let mnemonic = responseData.mnemonic;
            const mnemonicArray = mnemonic.split(' ');
            setMnemonicList(mnemonicArray);
            let randomNumbers = randomNum(1, 24);
            setRandomNumberList(randomNumbers);
            let newMnemonicList = [];
            mnemonicArray.map((key, index) => {
                if (randomNumbers.includes(index)) {
                    newMnemonicList.push('');
                } else {
                    newMnemonicList.push(key);
                }
            });
            setRandomMnemonicList(newMnemonicList);
            if (responseData.error) {
                setErrorMessage(responseData.error);
            }
        };
        getWallet();
    }, []);
    const handleCreateForm = (name) => {
        if (name === "keysForm") {
            setKeysForm(false);
            setMnemonicQuiz(true);
        }
    };

    const handleSubmitMnemonic = () => {
        for (let index = 0; index < randomNumberList.length; index++) {
            let phrase = document.getElementById('mnemonicKey' + randomNumberList[index]).value;
            if (mnemonicList[randomNumberList[index]] !== phrase) {
                setQuizError(true);
                return;
            } else {
                if (index === randomNumberList.length - 1) {
                    setQuizError(false);
                    setAccountInfo(true);
                    setMnemonicQuiz(false);
                }
            }
        }

    };

    const handleRoute = () => {
        setShow(false);
        dispatch(showSignInModal());
    };

    const handlePrevious = (formName) => {
        if (formName === "keysForm") {
            setShow(false);
            props.setShow(true);
            props.setCreatWallet(false);
        }
        if (formName === "mnemonicQuiz") {
            setKeysForm(true);
            setMnemonicQuiz(false);
            setQuizError(false);
        }
        if (formName === "accountInfo") {
            setMnemonicQuiz(true);
            setAccountInfo(false);
        }
    };
    const handleKeypress = e => {
        const regex = new RegExp("^[a-zA-Z0-9]+$");
        const key = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        if (!regex.test(key) && e.key !== "Enter") {
            e.preventDefault();
            return false;
        } else {
            if (e.key === "Enter") {
                handleSubmitMnemonic();
            }
        }

    };
    return (
        <div>
            <Modal backdrop="static" show={show} onHide={handleClose} centered
                className="create-wallet-modal large seed">
                {
                    keysForm ?
                        <>
                            <Modal.Header closeButton>
                                <div className="previous-section">
                                    <button className="button" onClick={() => handlePrevious("keysForm")}>
                                        <Icon
                                            viewClass="arrow-right"
                                            icon="left-arrow"/>
                                    </button>
                                </div>
                                <h3 className="heading">{t("CREATE_WALLET")}</h3>
                            </Modal.Header>
                            <div className="create-wallet-body create-wallet-form-body">

                                <p className="info">{t("ALREADY_HAVE_WALLET")} <span
                                    onClick={handleRoute}>{t("IMPORT_WALLET")}</span>
                                </p>
                                <div className="seed-section">
                                    <h3 className="heading copy">{t("MNEMONIC")} ({t("SEED_PHRASE")}) <Copy
                                        id={response.mnemonic}/>
                                    </h3>
                                    <div className="menmonic-list">
                                        {mnemonicList ?
                                            mnemonicList.map((key, index) => {
                                                return (
                                                    <Form.Control
                                                        disabled
                                                        key={index}
                                                        type="text"
                                                        value={key}
                                                        required={true}
                                                    />
                                                );
                                            }) : null
                                        }
                                    </div>
                                </div>
                                {errorMessage !== ''
                                    ? <p className="form-error">{errorMessage}</p>
                                    : null

                                }
                                <div className="buttons">
                                    <button className="button button-primary"
                                        onClick={() => handleCreateForm("keysForm")}>{t("NEXT")}
                                    </button>
                                </div>
                                <div className="note-section">
                                    <div className="exclamation"><Icon
                                        viewClass="arrow-right"
                                        icon="exclamation"/></div>
                                    <p>{t("SEED_WARNING")}</p>
                                </div>
                            </div>
                        </>
                        : null
                }
                {
                    mnemonicQuiz ?
                        <>
                            <Modal.Header closeButton>
                                <div className="previous-section">
                                    <button className="button" onClick={() => handlePrevious("mnemonicQuiz")}>
                                        <Icon
                                            viewClass="arrow-right"
                                            icon="left-arrow"/>
                                    </button>
                                </div>
                                <h3 className="heading">{t("CREATE_WALLET")}</h3>
                            </Modal.Header>
                            <div className="create-wallet-body create-wallet-form-body">
                                <p className="info">{t("ALREADY_HAVE_WALLET")} <span
                                    onClick={handleRoute}>{t("IMPORT_WALLET")}</span>
                                </p>
                                <div className="seed-section">
                                    <h3 className="heading copy">{t("MNEMONIC")} (Seed Phrase)
                                    </h3>
                                    <div className="menmonic-list">
                                        {randomMnemonicList.map((key, index) => {
                                            if (key !== '') {
                                                return (
                                                    <Form.Control
                                                        disabled
                                                        key={index}
                                                        type="text"
                                                        id={`mnemonicKey${index}`}
                                                        value={key}
                                                        onKeyPress={handleKeypress}
                                                        pattern="^[a-zA-Z0-9]+$"
                                                        required={true}
                                                    />
                                                );
                                            } else {
                                                return (
                                                    <Form.Control
                                                        key={index}
                                                        className="empty-mnemonic"
                                                        type="text"
                                                        id={`mnemonicKey${index}`}
                                                        onKeyPress={handleKeypress}
                                                        pattern="/^[A-Za-z0-9 ]+$"
                                                        defaultValue={key}
                                                        required={true}
                                                    />
                                                );
                                            }
                                        })
                                        }
                                    </div>
                                </div>
                                {quizError ?
                                    <p className="form-error">{t("MNEMONIC")} not matched</p>
                                    : null}
                                <div className="buttons">
                                    <button className="button button-primary"
                                        onClick={() => handleSubmitMnemonic()}>{t("SUBMIT")}
                                    </button>
                                </div>
                                <div className="note-section">
                                    <div className="exclamation"><Icon
                                        viewClass="arrow-right"
                                        icon="exclamation"/></div>
                                    <p>{t("SEED_WARNING")}</p>
                                </div>
                            </div>
                        </>
                        : null
                }
            </Modal>
            {accountInfo ?
                <AdvanceMode mnemonic={response.mnemonic} setAccountInfo={setAccountInfo} setShow={setShow}
                    setMnemonicQuiz={setMnemonicQuiz} handleClose={handleClose}/>
                : null
            }
        </div>
    );
};
export default CreateWallet;
