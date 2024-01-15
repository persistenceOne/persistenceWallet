import React, { useEffect, useState } from "react";
import Avatar from "../Avatar";
import DataTable from "../../../../components/DataTable";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  showTxRedeemSharesModal,
  setValidatorTxData
} from "../../../../store/actions/transactions/redeemShares";
import { handleDelegationTransferModal } from "../../../../store/actions/transactions/delegationTransfer";

const TokenizedShares = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [inputState, setInputState] = useState([]);

  const validators = useSelector((state) => state.validators);

  const tokenizeSharesInfo = useSelector((state) => state.tokenizeSharesInfo);

  useEffect(() => {
    let list = [];
    if (tokenizeSharesInfo.sharesList.length > 0) {
      tokenizeSharesInfo.sharesList.forEach((share) => {
        const valInfo = validators.validators.find(
          (validator) => validator.operatorAddress === share.validatorAddress
        );
        if (valInfo) {
          list.push({
            ...share,
            validatorName: valInfo.description.moniker,
            validatorImage: valInfo.description.identity
          });
        }
      });
    }
    setInputState(list);
  }, [validators, tokenizeSharesInfo]);

  const columns = [
    {
      name: "validator",
      label: t("VALIDATOR")
    },
    {
      name: "tokenizedAmount",
      label: "Tokenized Amount"
    },
    {
      name: "actions",
      label: t("ACTIONS"),
      options: { sort: false }
    }
  ];

  const handleRedeem = (validator) => {
    dispatch(
      setValidatorTxData({
        value: validator,
        error: new Error("")
      })
    );
    dispatch(showTxRedeemSharesModal());
  };

  const handleTransfer = (validator) => {
    dispatch(
      setValidatorTxData({
        value: validator,
        error: new Error("")
      })
    );
    dispatch(handleDelegationTransferModal(true));
  };

  const tableData = inputState.length
    ? inputState.map((validator, index) => [
        <div key={index} className="validator-name d-flex">
          <Avatar identity={validator.validatorImage} />
          {validator.validatorName}
        </div>,
        <div className="voting" key={index}>
          {validator.amount}
        </div>,
        <div className="actions-td" key={index}>
          <div
            className=" button-list mr-2"
            onClick={() => {
              handleRedeem(validator);
            }}
          >
            <button className="button button-primary">Redeem</button>
          </div>
          <div
            className=" button-list"
            key={index}
            onClick={() => {
              handleTransfer(validator);
            }}
          >
            <button className="button button-primary">Transfer</button>
          </div>
        </div>
      ])
    : [];

  const options = {
    responsive: "standard",
    filters: false,
    pagination: false,
    selectableRows: "none",
    sort: false,
    print: false,
    download: false,
    filter: false,
    viewColumns: false,
    search: false
  };

  return (
    <div className="txns-container delegated-validators transfer">
      <DataTable columns={columns} data={tableData} name="" options={options} />
    </div>
  );
};

export default TokenizedShares;
