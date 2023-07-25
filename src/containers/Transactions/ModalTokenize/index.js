import { Modal as ReactModal, OverlayTrigger, Popover } from "react-bootstrap";
import React, { useEffect } from "react";
import Icon from "../../../components/Icon";
import { useTranslation } from "react-i18next";
import Amount from "./Amount";
import { useDispatch, useSelector } from "react-redux";
import { hideTxTokenizeModal } from "../../../store/actions/transactions/tokenizeShares";
import ButtonSubmit from "./ButtonSubmit";
import { showValidatorTxModal } from "../../../store/actions/validators";
import Memo from "./Memo";
import { LOGIN_INFO } from "../../../constants/localStorage";
import Avatar from "../../Staking/Validators/Avatar";
import ToAddress from "./ToAddress";
import { fetchTokenizedSharesByAddress } from "../../../store/actions/tokenizeShares";
import { Spinner } from "../../../components/Spinner";

const ModalTokenize = (props) => {
  const dispatch = useDispatch();
  const validator = useSelector((state) => state.validators.validator.value);
  const show = useSelector((state) => state.tokenizeShares.modal);
  const tokenizeShareTxStatus = useSelector(
    (state) => state.tokenizeShares.tokenizeShareTxStatus
  );
  const { t } = useTranslation();
  const response = useSelector((state) => state.common.error);
  const loginInfo = JSON.parse(localStorage.getItem(LOGIN_INFO));

  useEffect(() => {
    fetchTokenizedSharesByAddress(loginInfo && loginInfo.address);
  }, []);

  const handleClose = () => {
    dispatch(hideTxTokenizeModal());
  };

  const handlePrevious = () => {
    dispatch(showValidatorTxModal());
    dispatch(hideTxTokenizeModal());
  };

  return (
    <ReactModal
      animation={false}
      backdrop="static"
      className="modal-custom delegate-modal modal-delegate"
      centered={true}
      keyboard={false}
      show={show}
      onHide={handleClose}
    >
      <ReactModal.Header closeButton>
        <div className="previous-section txn-header">
          <button className="button" onClick={() => handlePrevious()}>
            <Icon viewClass="arrow-right" icon="left-arrow" />
          </button>
        </div>
        <h3 className="heading">Tokenize {props.moniker}</h3>
      </ReactModal.Header>
      <ReactModal.Body className="delegate-modal-body">
        <div className="form-field">
          <p className="label">Selected Validator</p>
          <div className="available-tokens mb-3">
            {validator.description && (
              <div className="moniker-box d-flex align-items-center">
                <Avatar
                  identity={
                    validator.description && validator.description.identity
                  }
                />
                <div className="info">
                  <p className="name m-0">
                    {validator.description && validator.description.moniker}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <Amount />
        <ToAddress />
        {loginInfo && loginInfo.loginMode !== "keplr" ? <Memo /> : null}
        {response.error.message !== "" ? (
          <p className="form-error">{response.error.message}</p>
        ) : null}
        <ButtonSubmit />
        {tokenizeShareTxStatus === "pending" ? (
          <div className="d-flex align-items-center justify-content-center mt-3">
            <Spinner size={"small"} />
            <p className="ml-2 mb-0">tokenizing in progress</p>
          </div>
        ) : (
          ""
        )}
        {tokenizeShareTxStatus === "success" ? (
          <div className="d-flex align-items-center justify-content-center mt-3">
            <Spinner size={"small"} />
            <p className="ml-2 mb-0">Transferring tokenized shares</p>
          </div>
        ) : (
          ""
        )}
      </ReactModal.Body>
    </ReactModal>
  );
};

export default ModalTokenize;
