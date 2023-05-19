import React, { useEffect, useState } from "react";
import Avatar from "../Avatar";
import DataTable from "../../../../components/DataTable";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { DefaultChainInfo } from "../../../../config";
import Icon from "../../../../components/Icon";
import { decimalize } from "../../../../utils/scripts";
import Submit from "./button";
import AddressModal from "./AddressModal";
import TxnModal from "./TxnModal";

const TransferDelegations = () => {
  const { t } = useTranslation();
  const [inputState, setInputState] = useState([]);
  const [selectedList, setSelectedList] = useState([]);
  const [totalAmount, setTotalAmount] = useState("0");

  const validators = useSelector((state) => state.validators);

  useEffect(() => {
    let list = [];
    if (validators.delegatedValidators.length > 0) {
      validators.delegatedValidators.map((validator) => {
        list.push({
          name: validator.data.description.moniker,
          amount: decimalize(validator.delegations, 6),
          address: validator.data.operatorAddress,
          identity: validator.data.description.identity,
          inputAmount: ""
        });
      });
    }
    setInputState(list);
  }, [validators]);

  const onChangeHandler = (evt) => {
    let rex = /^\d{0,10}(\.\d{0,10})?$/;
    if (rex.test(evt.target.value)) {
      inputHandler(evt.target.name, evt.target.value);
    } else {
      return false;
    }
  };

  const inputHandler = (name, inputAmount) => {
    const newList = inputState.map((item) => {
      let itemCopy = item;
      if (item.name === name) {
        itemCopy.inputAmount = inputAmount;
        const response = selectedList.some((selectedItem) => {
          return selectedItem.name === item.name;
        });
        if (Number(inputAmount) > 0) {
          if (!response) {
            setSelectedList([...selectedList, item]);
          }
        } else {
          if (response) {
            setSelectedList(
              selectedList.filter(
                (selectedItem) => selectedItem.name !== item.name
              )
            );
          }
        }
      }
      return itemCopy;
    });
    const amount = newList.reduce((accumulator, object) => {
      return accumulator + Number(object?.inputAmount);
    }, 0);
    setInputState(newList);
    setTotalAmount(amount);
  };

  const columns = [
    {
      name: "validator",
      label: t("VALIDATOR")
    },
    {
      name: "delegatedAmount",
      label: `${t("DELEGATED_AMOUNT")}(${DefaultChainInfo.currency.coinDenom})`
    },
    {
      name: "transfer",
      label: t("TRANSFER_AMOUNT")
    }
  ];
  const tableData = inputState.length
    ? inputState.map((validator, index) => [
        <div key={index} className="validator-name d-flex">
          <div className="mr-4">
            {Number(validator.inputAmount) > 0 ? (
              <Icon icon="checkbox" viewClass="" />
            ) : (
              <span className="d-block empty-checkbox" />
            )}
          </div>
          <Avatar identity={validator.identity} />
          {validator.name}
        </div>,
        <div className="voting" key={index}>
          {validator.amount}
        </div>,

        <div className="actions-td" key={index}>
          <div className={"relative z-10"}>
            <input
              placeholder={"Enter Amount"}
              type="number"
              onWheel={(e) => e.target.blur()}
              className={`input-amount ${
                Number(validator.inputAmount) > Number(validator.amount)
                  ? "active"
                  : ""
              }`}
              name={validator.name}
              id={validator.name}
              value={validator.inputAmount}
              onChange={onChangeHandler}
            />
            {Number(validator.inputAmount) < Number(validator.amount) ? (
              <span
                className="text-light-high ml-2 text-sm font-bold uppercase
                            cursor-pointer absolute right-[10px] top-[10px]"
                onClick={() => inputHandler(validator.name, validator.amount)}
              >
                Max
              </span>
            ) : (
              ""
            )}
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
