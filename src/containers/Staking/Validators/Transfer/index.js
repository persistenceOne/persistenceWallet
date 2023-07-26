import React, { useEffect, useState } from "react";
import Avatar from "../Avatar";
import DataTable from "../../../../components/DataTable";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  showTxRedeemSharesModal,
  setValidatorTxData
} from "../../../../store/actions/transactions/redeemShares";
import Submit from "./button";
import AddressModal from "./AddressModal";
import TxnModal from "./TxnModal";

const TransferDelegations = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [inputState, setInputState] = useState([]);
  const [selectedList, setSelectedList] = useState([]);
  const [totalAmount, setTotalAmount] = useState("0");

  const validators = useSelector((state) => state.validators);

  const tokenizeSharesInfo = useSelector((state) => state.tokenizeSharesInfo);

  useEffect(() => {
    let list = [];
    if (tokenizeSharesInfo.sharesList.length > 0) {
      tokenizeSharesInfo.sharesList.forEach((share) => {
        const valInfo = validators.validators.find(
          (validator) => validator.operatorAddress === share.validatorAddress
        );
        console.log(valInfo, "valInfo", share);
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
    console.log(validator, "validator123");
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

        <div
          className="actions-td"
          key={index}
          onClick={() => {
            handleRedeem(validator);
          }}
        >
          <button className="button button-primary">Redeem</button>
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
      <Submit
        inputState={inputState}
        totalAmount={totalAmount}
        selectedList={selectedList}
      />
      <AddressModal />
      <TxnModal />
    </div>
  );
};

export default TransferDelegations;
