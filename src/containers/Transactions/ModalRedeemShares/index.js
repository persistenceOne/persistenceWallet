import { Modal as ReactModal, Table } from "react-bootstrap";
import React from "react";
import Icon from "../../../components/Icon";
import { useDispatch, useSelector } from "react-redux";
import { hideTxRedeemSharesModal } from "../../../store/actions/transactions/redeemShares";
import ButtonRedeem from "./ButtonRedeem";
import { showValidatorTxModal } from "../../../store/actions/validators";
import Memo from "./Memo";
import { LOGIN_INFO } from "../../../constants/localStorage";
import Avatar from "../../Staking/Validators/Avatar";
import { stringTruncate } from "../../../utils/scripts";

const ModalRedeemShares = () => {
  const dispatch = useDispatch();
  const validator = useSelector((state) => state.redeemShares.validator.value);
  const show = useSelector((state) => state.redeemShares.modal);

  console.log(show, "showshow", validator);
  const response = useSelector((state) => state.common.error);
  const loginInfo = JSON.parse(localStorage.getItem(LOGIN_INFO));

  const handleClose = () => {
    dispatch(hideTxRedeemSharesModal());
  };

  const handlePrevious = () => {
    dispatch(showValidatorTxModal());
    dispatch(hideTxRedeemSharesModal());
  };

  return show ? (
    <ReactModal
      animation={false}
      backdrop="static"
      className="modal-custom delegate-modal modal-delegate modal-redeem"
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
        <h3 className="heading">Redeeming Staked XPRT</h3>
      </ReactModal.Header>
      <ReactModal.Body className="delegate-modal-body">
        <div className="form-field d-flex align-items-center mb-3">
          <p className="label mr-3 mb-0">Selected Validator</p>
          <div className="available-tokens">
            <div className="moniker-box d-flex align-items-center">
              <Avatar
                identity={validator.validatorImage && validator.validatorImage}
              />
              <div className="info">
                <p className="name m-0">
                  {validator.validatorName && validator.validatorName}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="table-container border">
          <Table borderless className="m-0">
            <thead>
              <tr>
                <th className="pl-5">From Address</th>
                <th className="">Validator</th>
                <th className="text-center">Amount(XPRT)</th>
              </tr>
            </thead>
            <tbody>
              {validator.list.length > 0 &&
                validator.list.map((item, index) => (
                  <tr key={index}>
                    <td className="address pl-5">
                      {stringTruncate(item.owner)}
                    </td>
                    <td className="d-flex  name">
                      <Avatar identity={validator.validatorImage} />
                      {validator.validatorName}
                    </td>
                    <td className="text-center amount">{item.amount}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
        {loginInfo && loginInfo.loginMode !== "keplr" ? <Memo /> : null}
        {response.error.message !== "" ? (
          <p className="form-error">{response.error.message}</p>
        ) : null}
        <ButtonRedeem tokenizedShares={validator.list} />
      </ReactModal.Body>
    </ReactModal>
  ) : (
    ""
  );
};

export default ModalRedeemShares;
