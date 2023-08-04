import { Modal as ReactModal } from "react-bootstrap";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  hideKeyStoreModal,
  setTxKeyStorePassword
} from "../../../store/actions/transactions/keyStore";
import { showFeeModal } from "../../../store/actions/transactions/fee";
import FileInput from "./FileInput";
import Password from "./Password";
import Submit from "./Submit";
import Icon from "../../../components/Icon";
import Advanced from "../Advanced";
import {
  setLoginInfo,
  txFailed
} from "../../../store/actions/transactions/common";
import { useTranslation } from "react-i18next";
import {
  setAccountIndex,
  setAccountNumber,
  setBip39Passphrase
} from "../../../store/actions/transactions/advanced";
import { COIN_TYPE, ENCRYPTED_MNEMONIC } from "../../../constants/localStorage";
import CoinType from "./CoinType";
import { setCoinType } from "../../../store/actions/signIn/keyStore";
import { DefaultChainInfo } from "../../../config";
import { setTxTokenizeShareStatus } from "../../../store/actions/transactions/tokenizeShares";

const Modal = () => {
  const { t } = useTranslation();
  const show = useSelector((state) => state.keyStore.modal);
  const encryptedSeed = useSelector(
    (state) => state.common.loginInfo.encryptedSeed
  );
  const response = useSelector((state) => state.common.error);
  const dispatch = useDispatch();
  const encryptedMnemonic = localStorage.getItem(ENCRYPTED_MNEMONIC);
  const coinType = localStorage.getItem(COIN_TYPE);
  const txName = useSelector((state) => state.common.txName.value);

  useEffect(() => {
    if (encryptedMnemonic !== null) {
      dispatch(setCoinType(parseInt(coinType)));
      dispatch(
        setLoginInfo({
          encryptedSeed: true,
          error: {
            message: ""
          }
        })
      );
    } else {
      dispatch(setCoinType(DefaultChainInfo.deprecatedCoinType));
      dispatch(
        setLoginInfo({
          encryptedSeed: false,
          error: {
            message: ""
          }
        })
      );
    }
  }, []);

  const handleClose = () => {
    dispatch(hideKeyStoreModal());
    if (txName.name === "tokenize" || txName.name === "tokenize-transfer") {
      dispatch(setTxTokenizeShareStatus(""));
    }
  };

  const handleUpdateKeystore = () => {
    dispatch(
      setAccountIndex({
        value: "",
        error: { message: "" }
      })
    );
    dispatch(
      setAccountNumber({
        value: "",
        error: { message: "" }
      })
    );
    dispatch(
      setBip39Passphrase({
        value: "",
        error: { message: "" }
      })
    );
    dispatch(
      setTxKeyStorePassword({
        value: "",
        error: { message: "" }
      })
    );
    dispatch(txFailed(""));
    dispatch(
      setLoginInfo({
        encryptedSeed: false,
        error: {
          message: ""
        }
      })
    );
  };

  const keyStorePrevious = () => {
    dispatch(hideKeyStoreModal());
    dispatch(showFeeModal());
  };

  return (
    <ReactModal
      animation={false}
      backdrop="static"
      className="modal-custom keystore-m"
      centered={true}
      keyboard={false}
      show={show}
      onHide={handleClose}
    >
      <ReactModal.Header closeButton={true}>
        <div className="previous-section txn-header">
          <button className="button" onClick={() => keyStorePrevious()}>
            <Icon viewClass="arrow-right" icon="left-arrow" />
          </button>
        </div>
        <p>KeyStore</p>
      </ReactModal.Header>
      <ReactModal.Body className="create-wallet-body import-wallet-body">
        {!encryptedSeed ? <FileInput /> : null}
        <Password />
        {!encryptedSeed ? <CoinType /> : null}
        <Advanced />
        {response.error.message !== "" ? (
          <p className="form-error">{response.error.message}</p>
        ) : null}
        <Submit />
        {encryptedSeed ? (
          <div className="buttons">
            <p className="button-link" onClick={handleUpdateKeystore}>
              {t("CHANGE_KEY_STORE")}
            </p>
          </div>
        ) : null}
      </ReactModal.Body>
    </ReactModal>
  );
};

export default Modal;
