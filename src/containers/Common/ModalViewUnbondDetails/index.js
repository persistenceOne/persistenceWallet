import { Modal } from "react-bootstrap";
import React, { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import NumberView from "../../../components/NumberView";
import {
  formatNumber,
  localTime,
  stringToNumber
} from "../../../utils/scripts";
import { tokenValueConversion } from "../../../utils/helper";
import ReactGA from "react-ga4";
import { DefaultChainInfo } from "../../../config";
import ButtonSubmit from "./ButtonSubmit";
import {
  hideTxCancelUnbondModal,
  showTxCancelUnbondModal
} from "../../../store/actions/transactions/cancel-unbond";

const ModalViewUnbondDetails = (props) => {
  const dispatch = useDispatch();
  const unbondAmount = useSelector((state) => state.unbond.unbond);
  const show = useSelector((state) => state.cancelUnbondTx.modal);
  const response = useSelector((state) => state.common.error);
  const { t } = useTranslation();
  const handleClose = () => {
    dispatch(hideTxCancelUnbondModal());
  };
  const handleModal = () => {
    ReactGA.event({
      category: t("UNBONDING_MODAL_VIEW"),
      action: t("CLICK_UNBONDING_MODAL_VIEW")
    });
    dispatch(showTxCancelUnbondModal());
  };

  return (
    <>
      <Modal
        animation={false}
        centered={true}
        show={show}
        backdrop="static"
        size="lg"
        className="modal-custom list-modal"
        onHide={handleClose}
      >
        <Modal.Header className="result-header" closeButton>
          <h3 className="heading">{t("VIEW_UNBOND_SCHEDULE")}</h3>
        </Modal.Header>
        <Modal.Body className="list-modal-body unbond-modal">
          <div className="unbonding-schedule-list-header form-field mb-2 px-1">
            <p className={"label mb-0"}>Total Unbonding Amount</p>
            <div className={"d-flex align-items-center info-data"}>
              <p className={"mr-2 mb-0"}>
                {unbondAmount}&nbsp;
                {DefaultChainInfo.currency.coinDenom}
              </p>
              <ButtonSubmit
                entry={null}
                validatorAddress={null}
                type={"cancelAll"}
                list={props.list}
              />
            </div>
          </div>
          {/*<div className="unbonding-schedule-list-header">*/}
          {/*  <p>{t("UNBONDING_AMOUNT")}</p>*/}
          {/*  <p>{t("DATE")}</p>*/}
          {/*</div>*/}
          <div className={"unbonding-schedule-list-container"}>
            {props.list
              ? props.list.map((item) => {
                  return item.entries.length
                    ? item.entries.map((entry, entryIndex) => {
                        return (
                          <div
                            className="unbonding-schedule-list"
                            key={entryIndex}
                          >
                            <p>
                              <span className="amount">
                                <NumberView
                                  value={formatNumber(
                                    tokenValueConversion(
                                      stringToNumber(entry.balance)
                                    )
                                  )}
                                />
                                {DefaultChainInfo.currency.coinDenom}
                              </span>
                            </p>
                            <p>
                              <span className="date">
                                {localTime(
                                  entry["completionTime"].seconds.toNumber() *
                                    1000
                                )}
                              </span>
                            </p>
                            <ButtonSubmit
                              entry={entry}
                              validatorAddress={item.validatorAddress}
                              type={"individual"}
                              list={props.list}
                            />
                          </div>
                        );
                      })
                    : "";
                })
              : null}
          </div>
          {response.error.message !== "" ? (
            <p className="form-error">{response.error.message}</p>
          ) : null}
        </Modal.Body>
      </Modal>
      <span
        className="view-button"
        onClick={handleModal}
        title={`View Unbonding ${DefaultChainInfo.currency.coinDenom} Schedule`}
      >
        Cancel Unbonding
      </span>
    </>
  );
};

const stateToProps = (state) => {
  return {
    list: state.unbond.list
  };
};

export default connect(stateToProps)(ModalViewUnbondDetails);
