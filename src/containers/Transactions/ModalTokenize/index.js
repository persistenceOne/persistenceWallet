import { Modal as ReactModal, OverlayTrigger, Popover } from "react-bootstrap";
import React from "react";
import Icon from "../../../components/Icon";
import { useTranslation } from "react-i18next";
import Amount from "./Amount";
import { useDispatch, useSelector } from "react-redux";
import { hideTxTokenizeModal } from "../../../store/actions/transactions/tokenizeShares";
import ButtonSubmit from "./ButtonSubmit";
import { showValidatorTxModal } from "../../../store/actions/validators";
import Memo from "./Memo";
import { LOGIN_INFO } from "../../../constants/localStorage";

const ModalTokenize = (props) => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.tokenizeShares.modal);
  const { t } = useTranslation();
  const response = useSelector((state) => state.common.error);
  const loginInfo = JSON.parse(localStorage.getItem(LOGIN_INFO));

  const popover = (
    <Popover id="popover-basic">
      <Popover.Content>
        {t("DELEGATE_HEADER_HINT")}
        <p>
          <b>Note:</b> {t("DELEGATE_HEADER_HINT_NOTE")}{" "}
        </p>
      </Popover.Content>
    </Popover>
  );

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
        <Amount />
        {loginInfo && loginInfo.loginMode !== "keplr" ? <Memo /> : null}
        {response.error.message !== "" ? (
          <p className="form-error">{response.error.message}</p>
        ) : null}
        <ButtonSubmit />
      </ReactModal.Body>
    </ReactModal>
  );
};

export default ModalTokenize;
