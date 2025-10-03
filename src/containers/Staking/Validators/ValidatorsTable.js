import React from "react";
import helper from "../../../utils/helper";
import Avatar from "./Avatar";
// Icons referenced directly in JSX
import DataTable from "../../../components/DataTable";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {
  fetchValidatorDelegations,
  fetchValidatorRewards,
  setValidatorTxData,
  setValidatorTxModalName,
  showValidatorTxModal
} from "../../../store/actions/validators";
import { LOGIN_INFO } from "../../../constants/localStorage";
import { decimalize } from "../../../utils/scripts";

const ValidatorsTable = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const loginInfo = JSON.parse(localStorage.getItem(LOGIN_INFO));
  const handleModal = (name, validator) => {
    dispatch(showValidatorTxModal());
    dispatch(
      setValidatorTxData({
        value: validator,
        error: new Error("")
      })
    );
    dispatch(
      setValidatorTxModalName({
        value: "validator-actions"
      })
    );
    dispatch(fetchValidatorDelegations(loginInfo && loginInfo.address));
    dispatch(
      fetchValidatorRewards(
        loginInfo && loginInfo.address,
        validator.operatorAddress
      )
    );
  };
  const columns = [
    {
      name: "validator",
      label: t("VALIDATOR"),
      options: {
        sortCompare: (order) => {
          return (obj1, obj2) => {
            let val1 = obj1.data.props.children[1];
            let val2 = obj2.data.props.children[1];
            return (
              (val1.toUpperCase() < val2.toUpperCase() ? -1 : 1) *
              (order === "asc" ? 1 : -1)
            );
          };
        }
      }
    },
    {
      name: "votingPower",
      label: t("VOTING_POWER"),
      options: {
        sortCompare: (order) => {
          return (obj1, obj2) => {
            let val1 = parseInt(obj1.data.props.children[0]);
            let val2 = parseInt(obj2.data.props.children[0]);
            return (val1 - val2) * (order === "asc" ? 1 : -1);
          };
        }
      }
    },
    {
      name: "commission",
      label: t("COMMISSION"),
      options: {
        sortCompare: (order) => {
          return (obj1, obj2) => {
            let val1 = parseInt(obj1.data.props.children[0]);
            let val2 = parseInt(obj2.data.props.children[0]);
            return (val1 - val2) * (order === "asc" ? 1 : -1);
          };
        }
      }
    },
    {
      name: "status",
      label: t("STATUS"),
      options: { sort: false }
    },
    {
      name: "actions",
      label: t("ACTIONS"),
      options: { sort: false }
    }
  ];
  const tableData = props.validatorsList.length
    ? props.validatorsList.map((validator, index) => [
        <div key={index} className="validator-name">
          <Avatar identity={validator.data.description.identity} />
          {validator.data.description.moniker}
        </div>,
        <div className="voting" key={index}>
          {parseFloat((validator.data.tokens * Math.pow(10, -6)).toFixed())}
          <p className={"sub-text"}>
            {" "}
            {helper.isActive(validator.data)
              ? `(${parseFloat(
                  (
                    (validator.data.tokens * 100) /
                    props.activeValidatorsTokens
                  ).toString()
                )
                  .toFixed(6)
                  .toLocaleString()}%)`
              : `(${parseFloat(
                  (
                    (validator.data.tokens * 100) /
                    props.inActiveValidatorsTokens
                  ).toString()
                )
                  .toFixed(6)
                  .toLocaleString()}%)`}
          </p>
        </div>,
        <span className="voting" key={index}>
          {`${parseFloat(
            (
              decimalize(validator.data.commission.commissionRates.rate) * 100
            ).toFixed(6)
          )}`}{" "}
          %
        </span>,
        <div className="" key={index}>
          {helper.isActive(validator.data) ? (
            <div className="status-symbol active" title="active">
              <p>Active</p>
            </div>
          ) : (
            <div className="status-symbol inactive" title="active">
              <p>In-Active</p>
            </div>
          )}
        </div>,
        <div className="actions-td" key={index}>
          <button
            onClick={() => handleModal("ModalActions", validator.data)}
            className="button button-primary"
          >
            Manage
          </button>
        </div>
      ])
    : [];

  const options = {
    responsive: "standard",
    filters: false,
    pagination: false,
    selectableRows: "none",
    print: false,
    download: false,
    filter: false,
    viewColumns: false,
    search: false
    // onRowClick: handleRowClick
  };

  return (
    <div className="txns-container">
      <DataTable columns={columns} data={tableData} name="" options={options} />
    </div>
  );
};

export default ValidatorsTable;
