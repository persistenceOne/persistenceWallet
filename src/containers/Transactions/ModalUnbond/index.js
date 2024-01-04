import React from "react";
import { Modal as ReactModal, OverlayTrigger, Popover } from "react-bootstrap";
import Icon from "../../../components/Icon";
import Amount from "./Amount";
import Memo from "./Memo";
import ButtonSubmit from "./ButtonSubmit";
import { useDispatch, useSelector } from "react-redux";
import { hideTxUnbondModal } from "../../../store/actions/transactions/unbond";
import { showValidatorTxModal } from "../../../store/actions/validators";
import { LOGIN_INFO } from "../../../constants/localStorage";

const ModalUnbond = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.unbondTx.modal);
  const response = useSelector((state) => state.common.error);
  const loginInfo = JSON.parse(localStorage.getItem(LOGIN_INFO));

  const handleClose = () => {
    dispatch(hideTxUnbondModal());
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Content>
        <p>
          <b>Note:</b> Unbonding staked XPRT takes 21 days. Please note that you
          will not receive staking rewards during this unbonding period.
        </p>
      </Popover.Content>
    </Popover>
  );

  const handlePrevious = () => {
    dispatch(showValidatorTxModal());
    dispatch(hideTxUnbondModal());
  };

  return (
    <ReactModal
      animation={false}
      backdrop="static"
      className="modal-custom delegate-modal modal-unbond"
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
        <h3 className="heading">
          Unbond{" "}
          <OverlayTrigger
            trigger={["hover", "focus"]}
            placement="bottom"
            overlay={popover}
          >
            <button className="icon-button info" type="button">
              <Icon viewClass="arrow-right" icon="info" />
            </button>
          </OverlayTrigger>
        </h3>
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

export default ModalUnbond;
