import React from "react";
import { Modal as ReactModal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { hideValidatorTxModal } from "../../../../store/actions/validators";
import { useTranslation } from "react-i18next";
import Avatar from "../Avatar";
import helper from "../../../../utils/helper";
import { showTxDelegateModal } from "../../../../store/actions/transactions/delegate";
import { showTxReDelegateModal } from "../../../../store/actions/transactions/redelegate";
import { showTxUnbondModal } from "../../../../store/actions/transactions/unbond";
import { showTxTokenizeModal } from "../../../../store/actions/transactions/tokenizeShares";
import { showTxWithdrawValidatorRewardsModal } from "../../../../store/actions/transactions/withdrawValidatorRewards";
import { decimalize } from "../../../../utils/scripts";
import ReactGA from "react-ga4";

const ModalValidator = () => {
  const { t } = useTranslation();
  const show = useSelector((state) => state.validators.validatorTxModal);
  const validator = useSelector((state) => state.validators.validator.value);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(hideValidatorTxModal());
  };

  let commissionRate =
    decimalize(
      validator.commission ? validator.commission.commissionRates.rate : 0
    ) * 100;
  commissionRate = parseFloat(commissionRate.toFixed(6)).toLocaleString();

  const handleRoute = (tx) => {
    ReactGA.event({
      category: `${tx} transaction modal`,
      action: `Clicked on ${tx} transaction modal`
    });
    if (tx === "Delegate") {
      dispatch(hideValidatorTxModal());
      dispatch(showTxDelegateModal());
    } else if (tx === "Redelegate") {
      dispatch(hideValidatorTxModal());
      dispatch(showTxReDelegateModal());
    } else if (tx === "Unbond") {
      dispatch(hideValidatorTxModal());
      dispatch(showTxUnbondModal());
    } else if (tx === "Withdraw") {
      dispatch(hideValidatorTxModal());
      dispatch(showTxWithdrawValidatorRewardsModal());
    } else if (tx === "Tokenize") {
      dispatch(hideValidatorTxModal());
      dispatch(showTxTokenizeModal());
    }
  };
  return (
    <ReactModal
      animation={false}
      className="actions-modal modal-action"
      centered={true}
      keyboard={false}
      show={show}
      onHide={handleClose}
    >
      <ReactModal.Body className="actions-modal-body">
        {validator.description && (
          <div className="moniker-box">
            <Avatar
              identity={validator.description && validator.description.identity}
            />
            <div className="info">
              <p className="name">
                {validator.description && validator.description.moniker}
              </p>
              <p className="commission">
                {" "}
                {t("COMMISSION")} - {commissionRate}%
              </p>
            </div>
          </div>
        )}
        {validator.description && validator.description.website !== "" ? (
          <div className="website">
            <p className="name">{t("WEBSITE")}</p>
            <p className="value">
              <a
                href={validator.description && validator.description.website}
                rel="noopener noreferrer"
                target="_blank"
              >
                {validator.description && validator.description.website}
              </a>
            </p>
          </div>
        ) : null}
        {validator.description && validator.description.details !== "" ? (
          <div className="description">
            <p className="name">{t("DESCRIPTION")}</p>
            <p className="value">
              {validator.description && validator.description.details}
            </p>
          </div>
        ) : null}
        <div className="buttons-group">
          <button
            onClick={() => handleRoute("Delegate")}
            className="button button-primary"
          >
            {t("DELEGATE")}
          </button>

          <button
            className="button button-primary"
            onClick={() => handleRoute("Redelegate")}
          >
            {t("REDELEGATE")}
          </button>
          <button
            onClick={() => handleRoute("Unbond")}
            className="button button-primary"
          >
            {t("UNBOND")}
          </button>
          <button
            onClick={() => handleRoute("Withdraw")}
            className="button button-primary"
          >
            {t("CLAIM_REWARDS")}
          </button>
          <button
            onClick={() => handleRoute("Tokenize")}
            className="button button-primary"
          >
            Transfer Delegations
          </button>
        </div>
        {helper.foundationNodeCheck(
          validator.operatorAddress && validator.operatorAddress
        ) ? (
          <p className="amount-warning text-left">
            {" "}
            {t("FOUNDATION_NODE_WARNING")}
          </p>
        ) : (
          ""
        )}
      </ReactModal.Body>
    </ReactModal>
  );
};

export default ModalValidator;
